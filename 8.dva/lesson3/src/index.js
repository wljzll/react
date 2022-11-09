import React from 'react';
import dva, { connect } from './dva';
const app = dva();
app.model({
  namespace: 'counter',
  state: { number: 0 },
  reducers: {
    add(state) {
      return { number: state.number + 1 };
    },
  },
  effects: {
    *asyncAdd(action, { call, put }) {
      yield call(delay, 1000);
      yield put({ type: 'counter/add' });
    },
  },
});
function Counter(props) {
  return (
    <div>
      <p>{props.number}</p>
      <button onClick={() => props.dispatch({ type: 'counter/add' })}>同步</button>
      <button onClick={() => props.dispatch({ type: 'counter/asyncAdd' })}>
        异步
      </button>
    </div>
  );
}
const ConnectedCounter = connect((state) => state.counter)(Counter);
app.router(() => <ConnectedCounter />);
app.start('#root');

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(function () {
      resolve();
    }, ms);
  });
}
