import compose from "./compose";

/**
 * 应用中间件 middlewares = [promise, thunk, logger]
 * @param {*} logger 第一个中间件
 * @returns 
 */
 function applyMiddleware(...middlewares) {
    return function (createStore) {
        return function (reducer) {
            let store = createStore(reducer); // 先创建一个仓库
            let dispatch;
            let middlewareAPI = {
                getState: store.getState,
                dispatch: (action) => dispatch(action) // 这里这么做是为了传入logger的dispatch是改造后的dispatch
            }

            // dispatch = logger(store)(store.dispatch);
            // dispatch = logger(middlewareAPI)(store.dispatch);
            
            // chain = [promise()的执行结果, thunk()的执行结果, logger()的执行结果]
            let chain = middlewares.map(middleware => middleware(middlewareAPI));
            dispatch = compose(...chain)(store.dispatch);
            return {
                ...store,
                dispatch
            }
        }
    }
}


export default applyMiddleware;