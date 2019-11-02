import React, { Component } from 'react'
import TodoItem from './TodoItem'

export default class index extends Component {
 
  render() {
    return (
      <div>
        {
          this.props.todos.map(todo => {
            return (
             <TodoItem {...todo} key={todo.id}/>
            )
          })
        }
        
      </div>
    )
  }
}
