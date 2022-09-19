
import {REACT_TEXT} from '../constant'
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
  return dom;
}

function reconcileChildren(childrenVdom, parentDOM) {
  for (let i = 0; i < childrenVdom.length; i++) {
    let childVdom = childrenVdom[i];
    render(childVdom, parentDOM);
  }
}

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