import React, {Component} from 'react';
import {render} from 'react-dom';

// class App extends Component {
//   render () {
//     return (
//       <div>
//         <h1>类组件</h1>
//       </div>
//     )
//   }
// }



class App extends Component {
  render () {
    return (
      // 我们写的JSX语法，react会自动调用createElement方法帮我们实现DOM的渲染
      React.createElement(
        'div',
        {
          className:'app',
          id:'appRoot'
        },
        '这是JSX语法原理',
        React.createElement(
          'p',
          null,
          '第一子元素'
        ),
        React.createElement(
          'h1',
          null,
          '第二个子元素'
        )
      )
    )
  }
}

render(
  <App/>,
  document.querySelector('#root')
)

// React.createElemet()
// 接收无限多个参数，但是第一个和第二个参数是固定的
// 第一个参数：标签名
// 第二个参数：标签的属性
// 后面的参数：就是无限多个子元素，可以使用React.createElement()继续创建无限多的子元素