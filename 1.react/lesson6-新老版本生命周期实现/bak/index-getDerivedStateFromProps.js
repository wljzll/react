// import React from './react';
// import ReactDOM from './react-dom/client'
import React from 'react';
import ReactDOM from 'react-dom/client';

class Counter extends React.Component {
  static defaultProps = {
    name: '珠峰架构'
  }
  constructor(props) {
    super(props);
    this.state = {
      number: 0
    }
  }
  handleClick = () => {
    this.setState({number: this.state.number + 1})
  }
  render() {
    return (
      <div>
        <p>{this.state.number}</p>
        <ChildCounter count={this.state.number} />
        <button onClick={this.handleClick}>+</button>
      </div>
    )
  }
}

class ChildCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { number: 0 };
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    console.log(nextProps, prevState);
    const { count } = nextProps;
    // 当传入的type发生变化的时候，更新state
    if (count % 2 === 0) {
        return { number: count * 2 };
    } else {
        return { number: count * 3 };
    }
  }
  render() {
    console.log('ChildCounter 2.render', this.state);
    return (
      <div>{this.state.number}</div>
    )
  }
}

// 源码
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Counter/>
);

// let element = <Counter/>
// console.log(element)
// // 自己实现的
// ReactDOM.render(
//   element, document.getElementById('root')
// );
