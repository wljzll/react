import React from './react';
import ReactDOM from './react-dom/client'
// import React from 'react';
// import ReactDOM from 'react-dom/client';

class MouseTracker extends React.Component {
  constructor(props) {
      super(props);
      this.state = { x: 0, y: 0 };
  }

  handleMouseMove = (event) => {
      this.setState({
          x: event.clientX,
          y: event.clientY
      });
  }

  render() {
      return (
        <div onMouseMove={this.handleMouseMove}>
          {this.props.render(this.state)}
        </div>
      );
  }
}

// 源码
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <WrappedButton/>
// );

let element = <MouseTracker render={(props) =>
  <div>
    <h1>移动鼠标!</h1>
    <p>当前的鼠标位置是 ({props.x}, {props.y})</p>
  </div>} />
console.log(element);
// 自己实现的
ReactDOM.render(
  element,
  document.getElementById('root')
);
