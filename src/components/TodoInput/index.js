import React, {Component} from 'react'
import PropTypes from 'prop-types';


export default class TodoInput extends Component {
  constructor(){
    super()
    this.state = {
      inputValue : 'xxx'
    }
  }
  handelInputChange = (e) => {
    console.log(this.state.inputValue, e.currentTarget.value, 'input组件')
    this.setState({
      inputValue: e.currentTarget.value
    })
  }
  render() {
    return (
      <div>
      <input type="text" value={this.state.inputValue} onChange={this.handelInputChange}/>
      <button>{this.props.btnText}</button>
    </div>
    )
  }
}

// 函数组件使用PropTypes的方式
TodoInput.propTypes = {
  btnText: PropTypes.string
}

TodoInput.defaultProps = {
  btnText: '添加'
}

