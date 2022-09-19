import React from './react';
import ReactDOM from './react-dom/client'
// import React from 'react';
// import ReactDOM from 'react-dom/client';

function App () {
  const [number, setNumber] = React.useState(0);
  let handleClick = () => setNumber(number + 1);
  return (
    <div>
      <p>{number}</p>
      <button onClick={handleClick}>+</button>
    </div>
  )
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
