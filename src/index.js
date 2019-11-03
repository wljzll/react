import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';


const Counter = () => {
  const [count, setCount] = useState(0)
  useEffect(() => {
   document.title = `当前的数量是${count}`
  })
  return (
    <div>
      <button onClick={() => {
        setCount(count - 1)
      }}>-</button>
      <span>{count}</span>
      <button onClick={() => {
        setCount(count + 1)
      }}>+</button>
    </div>
  )
}

render(
  <Counter />,
  document.querySelector('#root')
)

// useState的用法
// 1、useState是一个数组，数组中有两个元素:
// 第一个是当前设置的state的值;
// 第二个是用来设置当前state的方法;
// 2、一个函数式组件的可以同时定义多个useState

// useEffect的用法
// useEffect相当于react生命周期的 componentDidMount 和componentDidUpdate的结合
// 组件渲染完成或者更新完成都会触发这个函数