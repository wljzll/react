// import React from 'react';
import ReactDOM from 'react-dom/client';

/**
 * 1. JSX表达式 表达式就是变量 常量 操作符 混合在一起的组合
 * 表达式是可以计算的 而且必须要有一个返回值
 * JSX更像是JS
 */
const root = ReactDOM.createRoot(document.getElementById('root'));
let title = 'hello'
let style = { background: 'green', color: 'red' }
let element = <h1 style={style}>{title + ' world'}</h1>
root.render(
  element
);

/**
 * 1. 变量的渲染
 * 2. style属性的写法
 * 3. class类的写法 class => className for => htmlFor 这个for就是表单的for属性
 */