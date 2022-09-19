import { createStore } from '../redux';
import combinedReducer from './reducers';
let store = createStore(combinedReducer);

// 保存原始的dispatch
let dispatch = store.dispatch;

/**
 * 中间件的核心原理就是劫持重写dispatch方法 在原始的dispatch方法之前和之后加入一些自定义的逻辑
 * @param {*} action 
 * @returns 
 */
// store.dispatch = function (action) {
//     console.log('prev state', store.getState());
//     dispatch(action);
//     console.log('next state', store.getState());
//     return action;
// }

store.dispatch = function (action) {
    setTimeout(() => {
        dispatch(action);
    }, 1000);
}

export default store;