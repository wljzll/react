import React, { Component } from 'react'

export default class TodoItem extends Component {

  render() {
    console.log(this.props)
    return (
      <div>
        <input type="checkbox"/>
        <span>{this.props.id}</span>
        <span>{this.props.title}</span>
       
      </div>
    )
  }
}
