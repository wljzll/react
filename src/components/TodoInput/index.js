import React from 'react'
import PropTypes from 'prop-types';

export default function TodoInput() {
  return (
    <div>
      TodoInput组件
    </div>
  )
}

// 函数组件使用PropTypes的方式
TodoInput.propTypes = {
  value: PropTypes.string
}

TodoInput.defaultProps = {
  value: PropTypes.string
}