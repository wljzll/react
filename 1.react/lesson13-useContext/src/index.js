import React from './react';
import ReactDOM from './react-dom/client'
// import React from 'react';
// import ReactDOM from 'react-dom/client';

const CounterContext = React.createContext();

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
  let { state, dispatch } = React.useContext(CounterContext);
  return (<div>
    Count: {state.number}
    <button onClick={() => dispatch({ type: 'ADD' })}>+</button>
    <button onClick={() => dispatch({ type: 'MINUS' })}>-</button>
  </div>
  )
}

function App() {
  const [state, dispatch] = React.useReducer(reducer, { number: 0 });
  return (
    <CounterContext.Provider value={{state, dispatch}}>
      <Counter />
    </CounterContext.Provider>

  )
}

// 源码
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <App />
// );

let element = <App />;
console.log(element, React, '=============');
// 自己实现的
ReactDOM.render(
  element,
  document.getElementById('root')
);
