// 我们写的JSX是经过babel编译，变成了createElement方法 所以不需要我们去实现从JSX变成createElement的过程
// 我们只需要实现createElement返回React元素的过程
import { wrapToVdom } from "./util";
import { Component } from './Component';
/**
 * @description createElement方法是将传入的参数组合处理成React元素
 * @param {*} type 元素类型
 * @param {*} config 元素的属性
 * @param {*} children 第一个儿子，后面可能有多个
 */
function createElement(type, config, children) {
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

  return {
    type,
    props
  }
}

const React = {
  createElement,
  Component
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
