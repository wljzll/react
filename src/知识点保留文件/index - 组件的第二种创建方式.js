import React, {Component} from 'react';
import {render} from 'react-dom';

// 定义组件的第二种方式 使用ES6的类
class App extends Component {
  render () {
    return (
      <div>
        <h1>类组件</h1>
      </div>
    )
  }
}

// 类组件渲染的原理: 当我们把创建的类当做组件去使用时，在后台回去自动创建类并且调用APP对象中的render方法，返回DOM
// const app = new App().render();

render(
  <App/>,
  // app,
  document.querySelector('#root')
)