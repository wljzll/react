// import React from './react';
// import ReactDOM from './react-dom/client'
import React from 'react';
import ReactDOM from 'react-dom/client';

class ClassCounter extends React.Component {
  render() {
      console.log('ClassCounter render'); // 这里无论传入的props是否改变都会重新渲染
      return <div>ClassCounter:{this.props.count}</div>
  }
}

function FunctionCounter(props) {
  console.log('FunctionCounter render'); // 这里无论传入的props是否改变都会重新渲染
  return <div>FunctionCounter:{props.count}</div>
}

class App extends React.Component {
  state = { number: 0 }
  amountRef = React.createRef()
  handleClick = () => {
      let nextNumber = this.state.number + parseInt(this.amountRef.current.value);
      this.setState({ number: nextNumber });
  }
  render() {
    return (
      <div>
        <ClassCounter count={this.state.number} />
        <FunctionCounter count={this.state.number} />
        <input ref={this.amountRef} />
        <button onClick={this.handleClick}>+</button>
      </div>
    )
  }
}

// 源码
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App/>
);

// let element = <App />;
// console.log(element);
// // 自己实现的
// ReactDOM.render(
//   element,
//   document.getElementById('root')
// );
