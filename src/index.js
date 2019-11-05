import React, { Component, createContext } from 'react';
import { render } from 'react-dom';

console.log(createContext())
const { Provider,
  Consumer: CounterConsumer
} = createContext()

// 定义组件存放数据 将数据通过挂载到 Provider组件的value属性上往下传递
class CounterProvider extends Component {
  constructor() {
    super()
    this.state = {
      count: 100
    }
  }
  incrementCount = () => {
    this.setState({
      count: this.state.count + 1
    })
  }
  decrementCount = () => {
    this.setState({
      count: this.state.count - 1
    })
  }
  render() {
    return (
      <Provider value={{
        count: this.state.count,
        onIncrementCount: this.incrementCount,
        onDecrementCount: this.decrementCount
      }}>
        {this.props.children}
      </Provider>
    )
  }
}


// 按钮组件
class CounterBtn extends Component {
  render() {
    return (
      <CounterConsumer>
        {
          ({ onIncrementCount, onDecrementCount }) => {
            const handler = this.props.type === "decrement" ? onDecrementCount : onIncrementCount;
            return <button onClick={handler}>{this.props.children}</button>
          }
        }
      </CounterConsumer>

    )
  }
}

// 数字组件
class Counter extends Component {
  render() {
    return (
      <CounterConsumer>
        {
          ({ count }) => {

            return <span>{count}</span>
          }
        }

      </CounterConsumer>

    )
  }
}


// 入口组件App组件
class App extends Component {
  render() {
    return (
      <>
        <CounterBtn type="decrement">-</CounterBtn>
        <Counter />
        <CounterBtn type="increment">+</CounterBtn>
      </>
    )
  }
}

render(
  <CounterProvider>
    <App />
  </CounterProvider>,
  document.querySelector('#root')
)

