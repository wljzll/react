
import { REACT_TEXT } from '../constant'
/**
 * @description 把虚拟DOM转成真实DOM插入容器中
 * @param {*} vdom 虚拟DOM
 * @param {*} container 容器
 */
function render(vdom, container) {
  let newDom = createDOM(vdom);
  container.appendChild(newDom); // 插入容器中
}

/**
 * @description 将虚拟DOM创建成真实DOM并返回
 * @param {*} vdom 虚拟DOM
 * @returns
 */
function createDOM(vdom) {
  // 从vdom中解构出type props
  let { type, props } = vdom;
  let dom;
  if (type === REACT_TEXT) { // 如果dom的类型是文本
    // content是wrapToVdom加的
    dom = document.createTextNode(props.content);
  } else if (typeof type === 'function') {
    if (type.isReactComponent) { // 如果有isReactComponent属性说明是类组件
      return mountClassComponent(vdom);
    } else {
      return mountFunctionComponent(vdom);
    }

  }
  else { // 走到这里说明是一个原生DOM
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
  return dom;
}

/**
 *
 * @param {*} vdom 类组件标签本身的虚拟DOM
 * @returns
 */
function mountClassComponent(vdom) {
  // type是类组件的Class的引用
  let { type, props } = vdom;
  let classInstance = new type(props);
  // 调用类组件实例的render()方法 - 又会调用React.CreateElement()方法 生成类组件中真实DOM的虚拟DOM
  let renderVdom = classInstance.render();
  // 将类组件中返回的真实DOM创建成虚拟DOM并返回
  return createDOM(renderVdom);
}

/**
 * @description 将函数式组件创建成真实DOM
 * @param {*} vdom babel编译出的函数式组件的虚拟DOM
 * @returns
 */
function mountFunctionComponent(vdom) {
  // 从babel编译出的函数式组件的虚拟DOM中解构出 type: ƒ FunctionComponent(props) 和 props:{name: 'zhufeng'}
  let { type, props } = vdom;
  // 执行函数式组件的函数 也会经过babel编译成虚拟DOM
  let renderVdom = type(props);
  // 将虚拟DOM交给createDOM()处理成真实DOM
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
    if (key === 'children') { continue; } // 后面会单独处理children属性 所以此处跳过去
    if (key === 'style') {
      let styleObj = newProps[key];
      for (const attr in styleObj) {
        dom.style[attr] = styleObj[attr];
      }
    } else {
      dom[key] = newProps[key]
    }
  }
}

const ReactDOM = {
  render
}
export default ReactDOM;
