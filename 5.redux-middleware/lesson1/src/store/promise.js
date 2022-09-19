/**
 * 
 * thunk中间件可以让我们派发函数 function
 * 默认情况下只能派发普通对象
 * @returns 
 */
function promise({ getState, dispatch }) {
    return function (next) { // 为了实现中间件的级联 next表示调用下一个中间件 next是原生的dispatch
        return function (action) { // 这才是我们改造后的dispatch方法
            if (action.then && typeof action.then === 'function') {
                action.then(dispatch);
            } else if (action.payload && typeof action.payload.then === 'function') {
                action.payload.then(result => dispatch({
                    ...action, payload: result
                })).catch(error => {
                    dispatch({
                        ...action,
                        payload: error,
                        error: true
                    })
                    return Promise.reject(error);
                })
            }
            else {
                next(action);
            }
        }
    }
}

export default promise;