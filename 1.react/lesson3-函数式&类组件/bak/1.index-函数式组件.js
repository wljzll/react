import React from './react';
import ReactDOM from './react-dom/client'
// import React from 'react';
// import ReactDOM from 'react-dom/client';

function FunctionComponent(props) {
  return <h1>hello, {props.name}</h1>
}
// let element = <FunctionComponent name="zhufeng" />
let element = React.createElement(FunctionComponent, { name: 'zhufeng' });
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