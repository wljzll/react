// import React from 'react';
import React from 'react';
import ReactDOM from 'react-dom/client';

/**
 * JSX javascript+xml html
 * jsx其实只是react团队提供的一个语法糖
 */


/**
 * 老的版本里，我们只要用到JSX, 就需要在顶部引入React变量
 * 但是在新的版本里，不再因为JSX语法引入React变量了
 */

/**
 * React元素：
 * React元素是构建React应用的最小单位 也就是所谓的虚拟DOM
 */

/**
 * 所谓的渲染就是按照react元素所描述的结构 创建真实的DOM元素 并插入root容器内
 * 会由ReactDOM来确认浏览器的真实DOM和虚拟DOM是一致的  
 */

// 这种写法用到了React.StrictMode所以必须要引入React
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <h1>hello</h1>
//   </React.StrictMode>
// );

// 这种写法就不需要了
const root = ReactDOM.createRoot(document.getElementById('root'));
// 下面两种写法实际的效果是一样的
// let element = <h1>hello</h1>;
let element = React.createElement("h1", null, "hello");
console.log(JSON.stringify(element, null, 2));
root.render(
  element
);
