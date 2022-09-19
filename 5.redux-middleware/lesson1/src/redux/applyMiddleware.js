/**
 * 应用中间件
 * @param {*} logger 第一个中间件
 * @returns 
 */
 function applyMiddleware(logger) {
    return function (createStore) {
        return function (reducer) {
            let store = createStore(reducer); // 先创建一个仓库
            let dispatch;
            let middlewareAPI = {
                getState: store.getState,
                dispatch: (action) => dispatch(action) // 这里这么做是为了传入logger的dispatch是改造后的dispatch
            }

            // dispatch = logger(store)(store.dispatch);
            dispatch = logger(middlewareAPI)(store.dispatch);

            return {
                ...store,
                dispatch
            }
        }
    }
}


export default applyMiddleware;