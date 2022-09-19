import React from './react';
import ReactDOM from './react-dom/client'
// import React from 'react';
// import ReactDOM from 'react-dom/client';

function reducer(state = { number: 0 }, action) {
  switch (action.type) {
    case 'ADD':
      return { number: state.number + 1 }
      break;
    case 'MINUS':
      return { number: state.number - 1 }
      break;
    default:
      return state
      break;
  }
}

function Counter() {
  const [state, dispatch] = React.useReducer(reducer, { number: 1 });
  return (<div>
    Count: {state.number}
    <button onClick={() => dispatch({ type: 'ADD' })}>+</button>
    <button onClick={() => dispatch({ type: 'MINUS' })}>-</button>
  </div>
  )
}

// 源码
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <Counter />
// );

let element = <Counter />;
console.log(element, React, '=============');
// 自己实现的
ReactDOM.render(
  element,
  document.getElementById('root')
);
