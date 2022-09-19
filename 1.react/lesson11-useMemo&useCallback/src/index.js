import React from './react';
import ReactDOM from './react-dom/client'
// import React from 'react';
// import ReactDOM from 'react-dom/client';

// 这种情况下 我们文本框输入值的时候 Child组件不应该重新渲染 但是实际上却渲染了
function Child({ data, handleClick }) {
  console.log('Child render');
  return <button onClick={handleClick}>{data.number}</button>
}
// 使用React.memo是浅比较 这时候也会变化 因为data是一个对象 每次更新的引用地址都不相同
let MemoChild = React.memo(Child);
let lastData;
function App() {
  console.log('App render');
  const [name, setName] = React.useState('zhufeng');
  const [number, setNumber] = React.useState(0);
  // useMemo 如果第二个参数发生了变化才会返回一个新的值 导致更新 否则返回的还是老值
  let data = React.useMemo(() => ({ number }), [number]);
  console.log(data === lastData);
  lastData = data;
  let handleClick = React.useCallback(() => setNumber(number + 1), [number]);
  return (<div>
    <input type="text" value={name} onChange={event => setName(event.target.value)} />
    {/* 当data或handleClick任意一个变化时 组件都会更新 */}
    <MemoChild data={data} handleClick={handleClick} />
  </div>)
}

// 源码
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
);

// let element = <App />;
// console.log(element, React, '=============');
// // 自己实现的
// ReactDOM.render(
//   element,
//   document.getElementById('root')
// );
