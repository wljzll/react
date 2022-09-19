import { REACT_TEXT, REACT_FORWARD_REF_TYPE, REACT_PROVIDER, REACT_CONTEXT, REACT_MEMO } from '../constant';
import { addEvent } from '../event';

let hookState = []; // 存放所有的state
let hookIndex = 0; // state的初始索引
let scheduleUpdate;

/**
 * @description 把虚拟DOM转成真实DOM插入容器中
 * @param {*} vdom 虚拟DOM
 * @param {*} container 容器
 */
function render(vdom, container) {
  mount(vdom, container);
  // 给scheduldUpdate赋值
  scheduleUpdate = () => {
    hookIndex = 0; // 更新的时候 重置为0 因为要从头走setState();
    compareTwoVdom(container, vdom, vdom); // 手动比较虚拟DOM 达到更新的效果 vdom不是指向当前更新 而是指向根组件
  }
}

function mount(vdom, container) {
  let newDom = createDOM(vdom);
  if (newDom) {
    container.appendChild(newDom); // 插入容器中
  }
}

// /**
//  * @description 创建一个state 这是一个闭包 hookIndex
//  * @param {初始state} initialState 
//  * @returns 当前的state和setState函数
//  */
// export function useState(initialState) {
//   // 栈里存放了就取出来 没放就是初始化赋初始值
//   hookState[hookIndex] = hookState[hookIndex] || initialState;
//   // 声明一个currentIndex就等于当前的hookIndex 形成闭包 currentIndex保存的就是当时的索引
//   let currentIndex = hookIndex;
//   // 定义setState函数
//   function setState(newState) {
//     // 如果newState是函数就执行
//     newState = typeof newState === 'function' ? newState(hookState[hookIndex]) : newState;
//     // 使用currentIndex更新对应的state 不能用hookIndex
//     hookState[currentIndex] = newState;
//     scheduleUpdate(); // 更新了state后 更新组件
//   }
//   // 返回时 先用当前的hookIndex获取state 然后+1
//   return [hookState[hookIndex++], setState];
// }

/**
 * 
 * @param {创建返回值的函数} factory 
 * @param {依赖项数组 只有依赖项数组的值发生了变化才会重新执行factory} deps 
 * @returns factory函数的返回值
 */
export function useMemo(factory, deps) {
  // 当组件更新时 会重置 hookIndex为0 所以组件内执行useMemo时
  // 执行到了useMemo那么hookIndex也是对应的
  if (hookState[hookIndex]) { // hookIndex对应的useMemo是否存在
    let [lastMemo, lastDeps] = hookState[hookIndex]; // 解构取出上一次的值
    // 对比依赖项
    let everySame = deps.every((item, index) => item === lastDeps[index]);
    if (everySame) { // 依赖项没有变化则返回上一次的创建函数创建的返回值
      hookIndex++;
      return lastMemo;
    } else { // 如果变化了 则重新执行返回
      let newMemo = factory();
      hookState[hookIndex++] = [newMemo, deps];
      return newMemo;
    }
  } else { // 初始化调用
    let newMemo = factory(); // 执行工厂函数 获取返回值
    hookState[hookIndex++] = [newMemo, deps]; // 保存成一个新的state
    return newMemo; // 返回返回值
  }
}

/**
 * @description useCallback是用来缓存函数的 
 * 如果依赖项deps变化了: 返回callback这是一个新的函数
 * 如果依赖项deps未变化: 返回lastCallback引用地址没变 所以把callback传给子组件时子组件不会更新
 * @param {*} callback 
 * @param {*} deps 
 * @returns 
 */
export function useCallback(callback, deps) {
  // 当组件更新时 会重置 hookIndex为0 所以组件内执行useMemo时
  // 执行到了useMemo那么hookIndex也是对应的
  if (hookState[hookIndex]) { // hookIndex对应的useMemo是否存在
    let [lastCallback, lastDeps] = hookState[hookIndex]; // 解构取出上一次的值
    // 对比依赖项
    let everySame = deps.every((item, index) => item === lastDeps[index]);
    if (everySame) { // 依赖项没有变化则返回上一次
      hookIndex++;
      return lastCallback;
    } else { // 如果变化了 则重新执行返回
      hookState[hookIndex++] = [callback, deps];
      return callback;
    }
  } else { // 初始化调用
    hookState[hookIndex++] = [callback, deps]; // 保存成一个新的state
    return callback; // 返回返回值
  }
}

/**
 * 
 * @param {*} reducer 自己定义的改变传入的状态的函数 
 * @param {*} initialState 初始状态
 * @returns 
 */
export function useReducer(reducer, initialState) {
  // hookState中有则取用 没有则赋初始值
  hookState[hookIndex] = hookState[hookIndex] || initialState;
  let currentIndex = hookIndex;
  function dispatch(action) {
    // 取老的state
    let oldState = hookState[currentIndex];
    // 有reducer则调用
    if (reducer) {
      hookState[currentIndex] = reducer(oldState, action);
    } else {
      hookState[currentIndex] = typeof action === 'function' ? action(oldState) : action;
    }
    scheduleUpdate();
  }
  return [hookState[hookIndex++], dispatch];
}

// useState是基于useReducer实现的
export function useState(initialState) {
  return useReducer(null, initialState);
}

export function useEffect(callback, deps) {
  let currentIndex = hookIndex;
  if (hookState[hookIndex]) {
    let [destory, lastDeps] = hookState[hookIndex];
    let everySame = deps && deps.every((item, index) => item === lastDeps[index]);
    if (everySame) {
      hookIndex++;
    } else {
      destory && destory();
      setTimeout(() => {
        let destory = callback();
        hookState[currentIndex++] = [destory, deps];
      });
    }
  } else {
    setTimeout(() => {
      let destory = callback();
      hookState[currentIndex++] = [destory, deps];
    });
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
  if (type && type.$$typeof === REACT_MEMO) { // 挂载memo组件
    return mountMemoComponent(vdom);
  } else if (type && type.$$typeof === REACT_PROVIDER) { // 挂载Provider组件
    return mountProviderComponent(vdom);
  } else if (type && type.$$typeof === REACT_CONTEXT) { // 挂载Consumer组件
    return mountContextComponent(vdom);
  } else if (type && type.$$typeof === REACT_FORWARD_REF_TYPE) { // 挂载Forward_ref组件
    return mountForwardComponent(vdom);
  } else if (type === REACT_TEXT) { // 处理文本类型
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
  if (type.contextType) {
    classInstance.context = type.contextType._currentValue;
  }
  // 将类组件的实例保存在虚拟DOM上
  vdom.classInstance = classInstance;
  if (ref) ref.current = classInstance;
  if (classInstance.componentWillMount) {
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
  let { type, props } = vdom;
  // 执行函数式组件的函数 也会经过babel编译成虚拟DOM 这里的虚拟DOM是函数式组件本身的标签的虚拟DOM
  // 这个renderVdom才是JSX的Vdom
  let renderVdom = type(props);
  vdom.oldRenderVdom = renderVdom;
  // 将虚拟DOM交给createDOM()处理成真实DOM
  return createDOM(renderVdom);
}

function mountForwardComponent(vdom) {
  let { type, props, ref } = vdom;
  // 将参数传递给forwardRef的函数参数
  let renderVdom = type.render(props, ref);
  // 执行过上面的render函数后: babel将JSX转成React.createElement() => 执行React.createElement() => 得到renderVdom
  vdom.oldRenderVdom = renderVdom;
  return createDOM(renderVdom);
}

function mountProviderComponent(vdom) {
  let { type, props } = vdom;
  let context = type._context;
  // 将Provider组件上的value属性赋值给 _currentValue 通过这个属性就实现了Provider和Cunsumer的共享数据
  context._currentValue = props.value;
  let renderVdom = props.children;
  vdom.oldRenderVdom = renderVdom;
  return createDOM(renderVdom);
}

function mountContextComponent(vdom) {
  let { type, props } = vdom;
  let context = type._context;
  // 将Provider共享的_currentValue传递给Consumer
  let renderVdom = props.children(context._currentValue);
  vdom.oldRenderVdom = renderVdom;
  return createDOM(renderVdom);
}

function mountMemoComponent(vdom) {
  let { type, props } = vdom;
  let renderVdom = type.type(props);
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
  if (!vdom.dom) { // 找到了直接返回
    let renderVdom = vdom.classInstance ? vdom.classInstance.oldRenderVdom : vdom.oldRenderVdom;
    return findDom(renderVdom);
  } else { // 未找到说明可能是函数组件或者类组件对应的组件标签的虚拟DOM 递归查找真实的DOM
    return vdom.dom;
  }
}

function unMountVdom(vdom) {
  let { props, ref } = vdom;
  let currentDom = findDom(vdom);
  if (vdom.classInstance && vdom.classInstance.componentWillUnMount) { // 卸载的时候如果有对应的生命周期函数 执行
    vdom.classInstance.componentWillUnMount();
  }
  if (ref) { // 卸载 清除ref
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
  if (!oldVdom && !newVdom) { // 老的新的都没有不需要处理
    return;
  } else if (!!oldVdom && !newVdom) { // 老的有新的没有
    unMountVdom(oldVdom);
  } else if (!oldVdom && !!newVdom) { // 老的没有新的有
    let newDOM = createDOM(newVdom); // 创建真实DOM
    if (nextDOM) { // 如果有下一个节点 插入
      parentDOM.insertBefore(newDOM, nextDOM);
    } else { // 没有下一个是最后一个
      parentDOM.appendChild(newDOM);
    }
    if (newDOM.componentDidMount) newDOM.componentDidMount(); // 执行钩子
    return;
  } else if (!!oldVdom && !!newVdom && oldVdom.type !== newVdom.type) { // 新老都有但是类型不同
    let newDOM = createDOM(newVdom);
    if (nextDOM) { // 如果有下一个节点 插入
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
  if (oldVdom.type.$$typeof === REACT_MEMO) {
    updateMemoComponent(oldVdom, newVdom);
  } else if (oldVdom.type.$$typeof === REACT_CONTEXT) { // 更新Cosumer
    updateContextComponent(oldVdom, newVdom);
  } else if (oldVdom.type.$$typeof === REACT_PROVIDER) { // 更新Provider
    updateProviderComponent(oldVdom, newVdom);
  }
  else if (oldVdom.type === REACT_TEXT) { // 老的是文本 走到这里新的也一定是文本
    let currentDOM = newVdom.dom = findDom(oldVdom);
    if (oldVdom.props !== newVdom.props) {
      currentDOM.textContent = newVdom.props.content;
    }
    return;
  } else if (typeof oldVdom.type === 'string') { // 普通的标签 更新属性 更新儿子
    let currentDOM = newVdom.dom = findDom(oldVdom);
    updateProps(currentDOM, oldVdom.props, newVdom.props);
    updateChildren(currentDOM, oldVdom.props.children, newVdom.props.children);
  } else if (typeof oldVdom.type === 'function') { // 函数式组件/类组件
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
  let { type, props } = newVdom;
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

function updateProviderComponent(oldVdom, newVdom) {
  let parentDOM = findDom(oldVdom).parentNode; // 拿到父DOM
  let { type, props } = newVdom; // 新的Vdom
  let context = type._context; // 获取引用地址
  context._currentValue = props.value; // 更新值
  let renderVdom = props.children;
  compareTwoVdom(parentDOM, oldVdom.oldRenderVdom, renderVdom);
  newVdom.oldRenderVdom = renderVdom;
}

function updateContextComponent(oldVdom, newVdom) {
  let parentDOM = findDom(oldVdom).parentNode;
  let { type, props } = newVdom;
  let context = type._context;
  let renderVdom = props.children(context._currentValue);
  compareTwoVdom(parentDOM, oldVdom.oldRenderVdom, renderVdom);
  newVdom.oldRenderVdom = renderVdom;
}

function updateMemoComponent(oldVdom, newVdom) {
  let { type } = oldVdom;
  if (!type.compare(oldVdom.props, newVdom.props)) {
    const oldDOM = findDom(oldVdom);
    const parentDOM = oldDOM.parentNode;
    const { type } = newVdom;
    let renderVdom = type.type(newVdom.props);
    compareTwoVdom(parentDOM, oldVdom.oldRenderVdom, renderVdom);
    newVdom.oldRenderVdom = renderVdom;
  } else {
    newVdom.oldRenderVdom = oldVdom.oldRenderVdom;
  }

}

function updateChildren(parentDOM, oldVChildren, newVChildren) { // 这里才是真正意义上的DOM-DIFF这里我们没有实现完整的
  oldVChildren = Array.isArray(oldVChildren) ? oldVChildren : (oldVChildren ? [oldVChildren].filter(item => item) : []);
  newVChildren = Array.isArray(newVChildren) ? newVChildren : (newVChildren ? [newVChildren].filter(item => item) : []);
  let maxLength = Math.max(oldVChildren.length, newVChildren.length);
  for (let i = 0; i < maxLength; i++) {
    let nextVdom = oldVChildren.find((item, index) => index > i && item && findDom(item));
    compareTwoVdom(parentDOM, oldVChildren[i], newVChildren[i], nextVdom && findDom(nextVdom));
  }
}
const ReactDOM = {
  render
}
export default ReactDOM;
