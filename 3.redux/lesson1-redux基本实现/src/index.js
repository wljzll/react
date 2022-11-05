

import React from 'react';
import ReactDOM from 'react-dom/client';
import Counter1 from './components/Counter';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Counter1 />
);

// ReactDOM.render(<Counter1 />, document.getElementById('root'));

/**
 * Redux的使用步骤：
 * 1. 在store中定义reducer;
 * 2. 在store中通过Redux的createStore(reducer)方法创建store;
 * 3. createStore(reducer)方法返回{getState, dispatch, subscribe} 三个方法;
 *    3.1 getState()获取store中最新的state状态;
 *    3.2 dispatch()派发动作交给reducer处理, 通过reducer修改state;
 *    3.3 subscribe()方法在组件的componentDidMount中使用, 回调函数中使用SetState()一旦State改变, 就触发组件更新;
 * 
 */