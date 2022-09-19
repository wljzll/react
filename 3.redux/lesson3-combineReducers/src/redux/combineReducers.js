
/**
 * 1. combineReducers返回的函数充当reducers
 * 2. dispatch时将state/action传入到返回的这个函数中
 * 3. 在这个函数中遍历组合的reducers对象 将state和action逐一传入
 * @param {*} reducers 将多个reducers函数组合成一个对象传入 
 * @returns 
 */
export default function combineReducers(reducers) {
    return function (state = {}, action) {
        let nextState = {};
        for (const key in reducers) {
            // state[key] 即是获取对应的state 当初始化时也是初始化state：state[counter1] state[counter2]
            nextState[key] = reducers[key](state[key], action);
        }
        return nextState;
    }
}

// 传入的reducers
// let reducers = {
//     counter1, // 这是一个函数
//     counter2  // 这也是一个函数
// }

/**
 * combineReducers这个API的目的是: 当我们有多个reducer时 因为redux只能接受一个reducer
 * 因此我们将多个reducer组合成一个对象 然后在函数中遍历
 * 每次调用dispatch都会走一遍所有的reducer
 */