import React, {Component} from 'react';
import {render} from 'react-dom';
import './index.css';

class App extends Component {
  render () {
    const style = {color:'red'}
    return (
      <div>
        <h1>元素的样式</h1>
        <ol>
          <li style={style}>使用style内联创建</li>
          <li className="hasTextBlue">使用class创建</li>
          <li>使用第三方包：classNames，动态添加className</li>
          <li>使用第三方包：styled-components </li>
        </ol>
      </div>
    )
  }
}


render(
  <App/>,
  document.querySelector('#root')
)