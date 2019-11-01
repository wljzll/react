import React from 'react';
import ReactDOM from 'react-dom';

// 创建组件的第一种方式的原理
// const createApp = (props) => {
//   return (
//     <div>
//       <h1>Hello World {props.title} !!!</h1>
//       <p>优秀的react {props.title} !!!</p>
//     </div>
//   )
// }

// const app = createApp({
//   title:'React 16.11'
// })

// react 创建组件的第一种方式 箭头函数
const App = (props) => {
  return (
    <div>
      {/* 只要在JSX语法中插入JS代码，就加一层花括号即可，所以这里的注释就加了一层花括号 */}
      <h1>Hello World {props.title} !!!</h1>
      <p>优秀的react {props.title} !!!</p>
    </div>
  )
}
ReactDOM.render(
  <App title="React 16.11"/>,
  document.querySelector('#root')
)