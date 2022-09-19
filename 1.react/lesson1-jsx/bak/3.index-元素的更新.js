// import React from 'react';
import ReactDOM from 'react-dom/client';

/**
 * 元素的更新
 * React元素本身是不可变的
 * 如果想更新某个元素 可以重新声明渲染，这个就相当于重新创建了
 */
const root = ReactDOM.createRoot(document.getElementById('root'));

let element = <h1 id="title">hello</h1>;
console.log(JSON.stringify(element, null, 2));
root.render(
  element
);



setTimeout(() => {
  // index.js:17 Uncaught TypeError: Cannot assign to read only property 'children' of object '#<Object>'
  // element.props.children = 'world';

  // Uncaught TypeError: Cannot assign to read only property 'type' of object '#<Object>'
  // element.type = 'div';

  // 这个不可扩展属性是react17加入的 17以前是可以扩展的
  // index.js:23 Uncaught TypeError: Cannot add property id, object is not extensible
  // element.id = "id";
  let element = <p>更改后的</p>
  root.render(
    element
  );
}, 1000);