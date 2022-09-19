import React from './react';
import ReactDOM from './react-dom/client'
// import React from 'react';
// import ReactDOM from 'react-dom/client';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// let element = (
//   <div className='title' style={{ color: 'red' }}>
//     <span>hello</span>world
//   </div>
// )

// 上面的代码经过babel转换 转换成createElement方法
let element = /*#__PURE__*/
  React.createElement("div", {
    className: "title",
    style: {
      color: 'red'
    }
  }, /*#__PURE__*/React.createElement("span", null, "hello"), "world");

console.log(JSON.stringify(element, null, 2));
ReactDOM.render(
    element, document.getElementById('root')
);

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


// 第一步：实现React.createElement()方法，返回一个React元素
// 第二步：实现render方法，把React元素变成真实的DOM元素插入页面root里