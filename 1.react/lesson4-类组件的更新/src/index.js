import React from './react';
import ReactDOM from './react-dom/client'
// import React from 'react';
// import ReactDOM from 'react-dom/client';

class ClassComponent extends React.Component {
  state = { number: 0 }
  handleClick = () => {
    // 回调是在更新后执行的
    this.setState({ number: this.state.number + 1 }, () => {
      console.log(this.state.number);
    });
    console.log(this.state.number);
  }
  render() {
    return <div>
      <p>{this.state.number}</p>
      <button onClick={this.handleClick}>+</button>
    </div>
  }
}

let element = <ClassComponent name="zhufeng666" />;
console.log(element, '类组件本身');

// 源码
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   element
// );

// 自己实现的
ReactDOM.render(
  element, document.getElementById('root')
);
