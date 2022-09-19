/**
 * 
 * @param {*} dispatch 这里的dispatch是改造后的dispatch 
 * @returns 
 */
function logger({ getState, dispatch }) {
    return function (next) { // 为了实现中间件的级联 next表示调用下一个中间件 next是原生的dispatch
        return function (action) { // 这才是我们改造后的dispatch方法
            console.log('prev state', getState());
            next(action); // 如果只有一个中间件的话 next就是原始的dispatch
            console.log('next state', getState());
            return action;
        }
    }
}

export default logger;