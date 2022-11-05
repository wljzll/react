// import React from './react';
// import ReactDOM from './react-dom/client'
import React from 'react';
import ReactDOM from 'react-dom/client';

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 0
    }
    console.log('Counter 1 constructor');
  }
  componentWillMount() { // react18 废弃了will相关的生命周期钩子
    console.log('Counter 2 componentWillMount');
  }
  componentDidMount() {
    console.log('Counter 4 componentDidMount');
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log('Counter 5 shouldComponentUpdate')
    return nextState.number % 2 === 0; // 2的倍数更新
  }
  componentWillUpdate() {
      console.log('Counter 6.componentWillUpdate');
  }
  componentDidUpdate() {
      console.log('Counter 7.componentDidUpdate');
  }
  handleClick = () => {
    this.setState({number: this.state.number + 1})
  }
  render() {
    console.log('Counter 3 render');
    return (
      <div>
        <p>{this.state.number}</p>
        {this.state.number === 4 ? null : <ChildCounter count={this.state.number} />}
        <button onClick={this.handleClick}>+</button>
      </div>
    )
  }
}

class ChildCounter extends React.Component {
  componentWillMount() {
    console.log('ChildCounter 1.componentWillMount');
  }
  componentDidMount() {
    console.log('ChildCounter 3.componentDidMount')
  }
  componentWillReceiveProps(newProps) { // 第一次不会执行，之后属性更新时才会执行
    console.log('ChildCounter 4.componentWillReceiveProps')
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log('ChildCounter 5.shouldComponentUpdate')
    return nextProps.count % 3 === 0; //子组件判断接收的属性 是否满足更新条件 为true则更新
  }
  componentWillUnmount() {
    console.log(' ChildCounter 6.componentWillUnmount')
  }
  render() {
    console.log('ChildCounter 2.render');
    return (
      <div>{this.props.number}</div>
    )
  }
}

// 源码
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Counter/>
);

// 自己实现的
// ReactDOM.render(
//   <Counter/>, document.getElementById('root')
// );
