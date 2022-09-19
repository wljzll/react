// 我们写的JSX是经过babel编译，变成了createElement方法 所以不需要我们去实现从JSX变成createElement的过程
// 我们只需要实现createElement返回React元素的过程
import { wrapToVdom } from "./util";
import { Component } from './Component';
import { REACT_FORWARD_REF_TYPE, REACT_CONTEXT, REACT_PROVIDER } from './constant';


/**
 * @description createElement方法是将传入的参数组合处理成React元素
 * @param {*} type 元素类型
 * @param {*} config 元素的属性
 * @param {*} children 第一个儿子，后面可能有多个
 */
function createElement(type, config, children) {
  let ref;
  let key;
  if (config) {
    delete config.__source;
    delete config.__self;
    // 从config中取出ref和key放到外层 并从config中删除
    ref = config.ref;
    delete config.ref;
    key = config.key;
    delete config.key;
  }
  let props = { ...config };
  if (arguments.length > 3) {
    // 将children参数以及children后的儿子都截取出来放到children上
    // arguments没有slice方法因此要借用原型上的slice方法
    props.children = Array.prototype.slice.call(arguments, 2).map(wrapToVdom);
  } else {
    // children可能的情况：字符串、数字、null、undefined 也可能是一个数组
    // children如果是数组，他的成员可能是虚拟DOM，也可能是字符串、数组
    props.children = wrapToVdom(children);
  }

  // 组成虚拟DOM返回
  return {
    type,
    ref,
    key,
    props
  }
}

// createRef的原理就是创建一个有current属性的实例：然后通过引用类型的地址将dom赋值上去
function createRef() {
  return {
    current: null
  }
}

// 原理: 新增了一种组件类型(REACT_FORWARD_REF_TYPE)
function forwardRef(render) {
  var elementType = {
    $$typeof: REACT_FORWARD_REF_TYPE,
    render: render
  }
  return elementType;
}

/**
 * 原理：闭包，创建一个不销毁的context实例， 提供两个组件Provider和Consumer 这两个组件共享 context
 * 上的_currentValue属性
 * @returns context对象
 */
function createContext() {
  // 定义一个context对象：_currentValue属性 Provider组件 Consumer组件
  let context = { _currentValue: undefined };
  // 自定义一个Provider组件
  context.Provider = {
    $$typeof: REACT_PROVIDER,
    _context: context
  }
  // 自定义一个Consumer组件
  context.Consumer = {
    $$typeof: REACT_CONTEXT,
    _context: context
  }
  return context;
}

const React = {
  createElement,
  Component,
  createRef,
  forwardRef,
  createContext
}

export default React;

/**
 React.createElement("h1", {id: "title"}, "hello", React.createElement("span", null, "world"));
 */

/**
 {
  "type": "div",
  "key": null,
  "ref": null,
  "props": {
    "className": "title",
    "style": {
      "color": "red"
    },
    "children": [
      {
        "type": "span",
        "key": null,
        "ref": null,
        "props": {
          "children": "hello"
        },
        "_owner": null,
        "_store": {}
      },
      "world"
    ]
  },
  "_owner": null,
  "_store": {}
}
 */
