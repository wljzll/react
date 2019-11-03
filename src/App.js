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
      article: '<div class="article">hahah</div>',
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

  // 添加todo的方法
  addTodo = (title) => {
    console.log(title, '添加的title')
    this.setState({
      todos: this.state.todos.concat({
        id: (Math.random() * 10).toFixed(0),
        title: title,
        completed: false
      })
    })
  }

  // 修改已完成未完成的方法
  changeInputChange = (id) => {
    this.setState((prevState) => {
      return {
        todos: prevState.todos.map(todo => {
          if (todo.id === id) {
            todo.completed = !todo.completed
          }
          return todo
        })
      }
    })
  }

  render() {
    return ( <
      Fragment > {
        /* {this.state.article}
                {<span dangerouslySetInnerHTML={{__html:this.state.article}}/>} */
      } <
      TodoHeader desc = {
        this.state.desc
      } > {
        this.state.title
      } <
      /TodoHeader>  <
      TodoInput btnText = "添加TODO"
      addTodo = {
        this.addTodo
      }
      /> <
      TodoList todos = {
        this.state.todos
      }
      changeInputChange = {
        this.changeInputChange
      }
      /> <
      /Fragment>
    )
  }
}


// 1、如果想通过props传递数字，不能使用 x = "1" y = "2",这种方式传递过去的是字符串, x = {1}, y = {2}
//