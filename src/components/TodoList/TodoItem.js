import React, { Component } from 'react'

export default class TodoItem extends Component {
  
  handleInputChange = () => {
    console.log(this.props.id)
    this.props.changeInputChange(this.props.id)
  }

  render() {
    return (
      <div>
        <input type="checkbox"
          checked={this.props.completed?true:false}
          onChange={this.handleInputChange}
        />
        <span>{this.props.id}</span>
        <span>{this.props.title}</span>
       
      </div>
    )
  }
}
