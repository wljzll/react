import React from 'react';
// import dva, { connect } from './dva';
import dva, { connect } from 'dva';


const app = dva();

app.model({
  namespace: 'counter1', // 命名空间
  state: { number: 0 }, // 每个命名空间都有自己的状态
  reducers: { // 每个命名空间都有自己的reducer处理器
    add(state) {
      return { number: state.number + 1 };
    }
  },
  effects: {
    *asyncAdd(action, { call, put }) {
      yield call(delay, 1000);
      // Warning: [sagaEffects.put] counter1/add should not be prefixed with namespace counter1
      // yield put({ type: 'counter1/add' });
      yield put({ type: 'add' });
    }
  }
});

// 定义组件
function Counter1(props) {
  return (
    <div>
      <p>{props.number}</p>
      <button onClick={() => props.dispatch({ type: "counter1/add" })}>+</button>
      <button onClick={() => props.dispatch({ type: "counter1/asyncAdd" })}>asyncAdd</button>
    </div>
  )
}
// 连接组件和仓库
const ConnectedCounter1 = connect(state => state.counter1)(Counter1);

/****************************** *******************************/
app.model({
  namespace: 'counter2',
  state: { number: 0 },
  reducers: {
    add(state) {
      return { number: state.number + 1 };
    }
  }
});

// 定义组件
function Counter2(props) {
  return (
    <div>
      <p>{props.number}</p>
      <button onClick={() => props.dispatch({ type: "counter2/add" })}>+</button>
    </div>
  )
}

const ConnectedCounter2 = connect(state => state.counter2)(Counter2);


app.router(() => <div><ConnectedCounter1 /><ConnectedCounter2 /></div>);
app.start('#root');

function delay(ms) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, ms);
  })
}