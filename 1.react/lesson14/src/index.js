// import React from './react';
// import ReactDOM from './react-dom/client'
import React from 'react';
import ReactDOM from 'react-dom/client';


function Counter() {
  const [number, setNumber] = React.useState(0);
  React.useEffect(() => {
    console.log('开启一个新的定时器');
    const $timer = setInterval(() => {
      setNumber(number => number + 1);
    }, 1000);

    return () => {
      console.log('销毁老的定时器');
      clearInterval($timer);
    }
  }, []);
  return (<div>
    {number}
  </div>
  )
}


// 源码
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Counter />
);

// let element = <Counter />;
// console.log(element, React, '=============');
// // 自己实现的
// ReactDOM.render(
//   element,
//   document.getElementById('root')
// );

/**
 * 纯函数：
 * 1. 不能修改参数
 * 2. 不能修改函数作用域外的变量
 * 
 * 副作用：
 * 1. 修改DOM
 * 2. 修改全局变量
 * 3. 调用接口
 * 4. 开启定时器
 */
