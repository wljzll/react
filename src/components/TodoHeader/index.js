import React, { Component } from 'react'
import PropTypes from 'prop-types';

console.log(PropTypes)
export default class TodoHeader extends Component {
  
  // class类方式的组件可以使用静态属性,也可以使用函数形式的方式
  static propTypes = {
    x: PropTypes.string
  }
  
  static defaultProps = {
    
  }
  render() {
    console.log(this.props)
    return (
      <div>
       <h1>{this.props.children} </h1> 
        
       <p>{this.props.desc}</p>

      </div>
    )
  }
}
