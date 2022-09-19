// import React from './react';
// import ReactDOM from './react-dom/client'
// import React from 'react';
// import ReactDOM from 'react-dom/client';

// 这种情况下 我们文本框输入值的时候 Child组件不应该重新渲染 但是实际上却渲染了
function Child({ data, handleClick }) {
  console.log('Child render');
  return <button onClick={handleClick}>{data.number}</button>
}

function App() {
  console.log('App render');
  const [name, setName] = React.useState('zhufeng');
  const [number, setNumber] = React.useState(0);
  let date = { number };
  let handleClick = () => setNumber(number + 1);
  return
  <div>
    <input type="text" value={name} onChange={event => setName(event.target.value)} />
    <Child data={data} handleClick={handleClick} />
  </div>
}

// 源码
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <App/>
// );

let element = <App />;
console.log(element, React, '=============');
// 自己实现的
ReactDOM.render(
  element,
  document.getElementById('root')
);
