import React, {
  Component,
  Fragment
} from 'react';
import {
  TodoHeader,
  TodoInput,
  TodoList
} from './components'

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      title: '代办事项列表',
      desc: '今日事,今日毕',
      article:'<div class="article">hahah</div>',
      todos: [{
        id: 1,
        title: '吃饭',
        completed: false
      },
      {
        id: 2,
        title: '睡觉',
        completed: true
      }
      ]
    }
  }


  render() {
    return (
      <Fragment>
        {/* {this.state.article}
        {<span dangerouslySetInnerHTML={{__html:this.state.article}}/>} */}
        <TodoHeader desc={this.state.desc}>
          {this.state.title}
        </TodoHeader> <TodoInput btnText="添加TODO" />
        <TodoList todos={this.state.todos}/>
      </Fragment>
      )
    }
  }
  
  
// 1、如果想通过props传递数字，不能使用 x = "1" y = "2",这种方式传递过去的是字符串, x = {1}, y = {2}
//