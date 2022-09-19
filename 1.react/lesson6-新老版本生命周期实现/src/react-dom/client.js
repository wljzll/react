import { REACT_TEXT, REACT_FORWARD_REF_TYPE } from '../constant';
import { addEvent } from '../event';
/**
 * @description 把虚拟DOM转成真实DOM插入容器中
 * @param {*} vdom 虚拟DOM
 * @param {*} container 容器
 */
function render(vdom, container) {
  let newDom = createDOM(vdom);
  if (newDom) {
    container.appendChild(newDom); // 插入容器中
  }
}

/**
 * @description 将虚拟DOM创建成真实DOM并返回
 * @param {*} vdom 虚拟DOM
 * @returns
 */
function createDOM(vdom) {
  // 从vdom中解构出type props
  let { type, props, ref } = vdom;
  let dom;
  if (type && type.$$typeof === REACT_FORWARD_REF_TYPE) {
    return mountForwardComponent(vdom);
  } else if (type === REACT_TEXT) { // 如果dom的类型是文本
    // content是wrapToVdom加的
    dom = document.createTextNode(props.content);
  } else if (typeof type === 'function') {
    if (type.isReactComponent) { // 如果有isReactComponent属性说明是类组件
      return mountClassComponent(vdom);
    } else {
      return mountFunctionComponent(vdom);
    }
  } else { // 走到这里说明是一个原生DOM
    dom = document.createElement(type);
  }
  if (props) {
    // 根据虚拟DOM中的属性更新真实DOM属性
    updateProps(dom, {}, props);
    if (typeof props.children === 'object' && props.children.type) { // 子元素是个对象说明只有一个儿子
      render(props.children, dom); // 递归处理
    } else if (Array.isArray(props.children)) {
      // 多个子元素循环处理
      reconcileChildren(props.children, dom);
    }
  }
  // 给虚拟dom上挂载一个dom属性指向虚拟DOM对应的真实DOM
  vdom.dom = dom;
  // 将dom 关联到对应的ref.current引用上
  if (ref) ref.current = dom;
  return dom;
}

/**
 * 注意这里的classInstance是类组件的实例标签并不是类组件中的JSX
 * @param {*} vdom 类组件ClassComponent这个标签的虚拟DOM
 * @returns
 */
function mountClassComponent(vdom) {
  let { type, props, ref } = vdom;
  // new 出来的类组件的实例
  let classInstance = new type(props);
  // 将类组件的实例保存在虚拟DOM上
  vdom.classInstance = classInstance;
  if (ref) ref.current = classInstance;
  if(classInstance.componentWillMount) {
    classInstance.componentWillMount();
  }
  // 调用类组件的render方法: 先经过babel将render方法中的JSX编译成React.createElement()方法，再执行React.createElement()方法生成虚拟DOM
  // 这个renderVdom才是JSX的Vdom
  let renderVdom = classInstance.render();
  // 给类组件的实例上添加也给oldRenderVdom属性 属性值是类组件的标签的虚拟DOM
  classInstance.oldRenderVdom = renderVdom;
  // 将虚拟DOM交给createDOM方法处理成真实DOM
  let dom = createDOM(renderVdom);
  if (classInstance.componentDidMount) classInstance.componentDidMount();
  return dom;
}

/**
 * @description 将函数式组件创建成真实DOM
 * @param {*} vdom babel编译出的函数式组件的虚拟DOM
 * @returns
 */
function mountFunctionComponent(vdom) {
  // 从babel编译出的函数式组件的虚拟DOM中解构出 type: ƒ FunctionComponent(props) 和 props:{name: 'zhufeng'}
  let { type, props, ref } = vdom;
  // 执行函数式组件的函数 也会经过babel编译成虚拟DOM 这里的虚拟DOM是函数式组件本身的标签的虚拟DOM
  // 这个renderVdom才是JSX的Vdom
  let renderVdom = type(props);
  vdom.oldRenderVdom = renderVdom;
  // 将虚拟DOM交给createDOM()处理成真实DOM
  return createDOM(renderVdom);
}

function mountForwardComponent(vdom) {
  let {type, props, ref} = vdom;
  // 将参数传递给forwardRef的函数参数
  let renderVdom = type.render(props, ref);
  // 执行过上面的render函数后: babel将JSX转成React.createElement() => 执行React.createElement() => 得到renderVdom
  vdom.oldRenderVdom = renderVdom;
  return createDOM(renderVdom);
}

// 多个子元素时遍历子元素 逐个挂载
function reconcileChildren(childrenVdom, parentDOM) {
  for (let i = 0; i < childrenVdom.length; i++) {
    let childVdom = childrenVdom[i];
    render(childVdom, parentDOM);
  }
}

/**
 * @descirption 将style/id/class等属性挂载到真实DOM上
 * @param {*} dom 创建出的真实DOM
 * @param {*} oldProps 老的属性
 * @param {*} newProps 新的属性
 */
function updateProps(dom, oldProps, newProps) {
  for (const key in newProps) {
    if (key === 'children') {
      continue;
    } // 后面会单独处理children属性 所以此处跳过去
    if (key === 'style') {
      let styleObj = newProps[key];
      for (const attr in styleObj) {
        dom.style[attr] = styleObj[attr];
      }
    } else if (/^on[A-Z].*/.test(key)) { // 处理事件绑定
      // dom[key.toLocaleLowerCase()] = newProps[key];
      // 将事件全都委托到document上
      addEvent(dom, key.toLocaleLowerCase(), newProps[key])
    } else {
      dom[key] = newProps[key]
    }
  }
}

// 从vdom上递归查找真实的DOM
export function findDom(vdom) {
  if (!vdom) return null;
  if (vdom.dom) { // 找到了直接返回
    return vdom.dom;
  } else { // 未找到说明可能是函数组件或者类组件对应的组件标签的虚拟DOM 递归查找真实的DOM
    let renderVdom = vdom.oldRenderVdom;
    findDom(renderVdom);
  }
}

function unMountVdom(vdom) {
  let {type, props, ref} = vdom;
  let currentDom = findDom(vdom);
  if (vdom.classInstance && vdom.classInstance.componentWillUnMount) { // 卸载的时候如果有对应的生命周期函数 执行
     vdom.classInstance.componentWillUnMount();
  }
  if(ref) { // 卸载 清除ref
    ref.current = null;
  }
  // 有儿子递归删除
  if (props.children) {
    let children = Array.isArray(props.children) ? props.children : [props.children]; // 将儿子统一成数组
    children.forEach(unMountVdom)
  }
  if (currentDom) currentDom.remove();
}

export function compareTwoVdom(parentDOM, oldVdom, newVdom, nextDOM) {
  if(!oldVdom && !newVdom) { // 老的新的都没有不需要处理
    return;
  } else if (!!oldVdom && !newVdom) { // 老的有新的没有
    unMountVdom(oldVdom);
  } else if (!oldVdom && !!newVdom) { // 老的没有新的有
    let newDOM = createDOM(newVdom); // 创建真实DOM
    if(nextDOM) { // 如果有下一个节点 插入
      parentDOM.insertBefore(newDOM, nextDOM);
    } else { // 没有下一个是最后一个
      parentDOM.appendChild(newDOM);
    }
    if (newDOM.componentDidMount) newDOM.componentDidMount(); // 执行钩子
    return;
  } else if (!!oldVdom && !!newVdom && oldVdom.type !== newVdom.type) { // 新老都有但是类型不同
    let newDOM = createDOM(newVdom);
    if(nextDOM) { // 如果有下一个节点 插入
      parentDOM.insertBefore(newDOM, nextDOM);
    } else { // 没有下一个是最后一个
      parentDOM.appendChild(newDOM);
    }
    unMountVdom(oldVdom);
    // 有componentDidMount执行
    if (newDOM.componentDidMount) newDOM.componentDidMount();
  } else { // 新老都有但是类型相同
    updateElement(oldVdom, newVdom);
  }
}

function updateElement(oldVdom, newVdom) {
  if(oldVdom.type === REACT_TEXT) { // 老的是文本 走到这里新的也一定是文本
    let currentDOM = newVdom.dom = findDom(oldVdom);
    if (oldVdom.props !== newVdom.props) {
      currentDOM.textContent = newVdom.props.content;
    }
    return;
  } else if (typeof oldVdom.type === 'string') { // 普通的标签 更新属性 更新儿子
    let currentDOM = newVdom.dom = findDom(oldVdom);
    updateProps(currentDOM, oldVdom.props, newVdom.props);
    updateChildren(currentDOM, oldVdom.props.children, newVdom.props.children);
  }  else if (typeof oldVdom.type === 'function') { // 函数式组件/类组件
    if (oldVdom.type.isReactComponent) {
        updateClassComponent(oldVdom, newVdom);
    } else {
        updateFunctionComponent(oldVdom, newVdom);
    }
  }
}

function updateFunctionComponent(oldVdom, newVdom) {
  let currentDOM = findDom(oldVdom);
  if (!currentDOM) return;
  let parentDOM = currentDOM.parentNode;
  let { type,props } = newVdom;
  let newRenderVdom = type(props);
  compareTwoVdom(parentDOM, oldVdom.oldRenderVdom, newRenderVdom);
  newVdom.oldRenderVdom = newRenderVdom;
}

function updateClassComponent(oldVdom, newVdom) {
  let classInstance = newVdom.classInstance = oldVdom.classInstance;
  if (classInstance.componentWillReceiveProps) {
    classInstance.componentWillReceiveProps(newVdom.props);
  }
  classInstance.updater.emitUpdate(newVdom.props);
}

function updateChildren(parentDOM, oldVChildren, newVChildren) { // 这里才是真正意义上的DOM-DIFF这里我们没有实现完整的
  oldVChildren = Array.isArray(oldVChildren) ? oldVChildren : (oldVChildren ? [oldVChildren].filter(item => item) : []);
  newVChildren = Array.isArray(newVChildren) ? newVChildren : (newVChildren ? [newVChildren].filter(item => item) : []);
  let maxLength = Math.max(oldVChildren.length, newVChildren.length);
  for (let i = 0; i < maxLength; i++) {
    let nextVdom = oldVChildren.find((item,index)=>index > i && item && findDom(item));
    compareTwoVdom(parentDOM, oldVChildren[i], newVChildren[i], nextVdom&&findDom(nextVdom));
  }
}
const ReactDOM = {
  render
}
export default ReactDOM;
