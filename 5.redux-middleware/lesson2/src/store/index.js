import { createStore, compose, applyMiddleware } from '../redux';
import combinedReducer from './reducers';
import logger from './logger';
import thunk from './thunk';
import promise from './promise';

let store = applyMiddleware(promise, thunk, logger)(createStore)(combinedReducer);

export default store;
/**************************** *************************/
// 中间件的核心原理就是劫持重写dispatch方法 在原始的dispatch方法之前和之后加入一些自定义的逻辑

// 中间件的执行顺序: 派发action时，依次执行：
// 1. promise劫持的dispatch方法
// 2. thunk劫持的dispatch方法
// 3. logger劫持的dispatch方法
// 4. 原生的dispatch方法
