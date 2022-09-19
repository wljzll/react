import React from './react';
import ReactDOM from './react-dom/client'
// import React from 'react';
// import ReactDOM from 'react-dom/client';

/**
 * 组件分为内置原生组件和自定义组件
 * 内置组件：p h1 span type都是字符串
 * 自定义组件 类型是一个函数 类组件的父类Component的原型上有一个属性isReactComponent = {};
 * 自定义组件的名称必须是首字母大写
 * 自定义组件的返回值有且只能一个根元素
 */
class ClassComponent extends React.Component {
  render() {
    return <h1 style={{ color: 'red' }} className="title"><span>hello</span> {this.props.name}</h1>
  }
}

let element = <ClassComponent name="zhufeng666" />;
console.log(element);
// const root = ReactDOM.createRoot(document.getElementById('root'));
ReactDOM.render(
  element, document.getElementById('root')
);

// 函数式组件被编译成虚拟DOM后的结果
/**
 {
  "type": ƒ FunctionComponent(props),
  "key": null,
  "ref": null,
  "props": {name: 'zhufeng'},
  "_owner": null,
  "_store": {}
}
 */

// 类组件被babel编译成虚拟DOM后的结果
/**
 {
  "type": class ClassComponent,
  "key": null,
  "ref": null,
  "props": {name: 'zhufeng'},
  "_owner": null,
  "_store": {}
}
 */