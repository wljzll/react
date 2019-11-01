import React, { Component, Fragment } from 'react';
import {
  TodoHeader,
  TodoInput,
  TodoList
} from './components'

export default class App extends Component {
  render() {
    return (
      <Fragment>
        <TodoHeader desc="待办事项" x="1" y="2" m = {1} n = {2}>
          代办事项列表
        </TodoHeader>
        <TodoInput />
        <TodoList />
      </Fragment>
    )
  }
}


// 1、如果想通过props传递数字，不能使用 x = "1" y = "2",这种方式传递过去的是字符串, x = {1}, y = {2}
// 