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
            let chain = middlewares.map(middleware => middleware(middlewareAPI)); // 这里会将每个中间件的第一层执行掉
            dispatch = compose(...chain)(store.dispatch);
            console.log('级联后的中间件的dispatch方法', dispatch.toString());
            return {
                ...store,
                dispatch
            }
        }
    }
}


export default applyMiddleware;
/**
 * [promise, thunk, logger]
 *
 * 第一次循环： a=promise b=thunk
 * 返回 (...args) => promise(thunk(...args))
 * 这个函数是第二次的a
 *
 * 第二次循环： a=(...args) => promise(thunk(...args)) b=logger
 * 返回 (...args) => promise(thunk(logger(...args)))
 *
 * 当执行compose(...chain)(store.dispatch)时 就是执行((store.dispatch) => promise(thunk(logger(store.dispatch))))
 * 函数执行过程：
 *              先执行logger中间件的第二层：获得logger劫持dispatch函数 将loggerDispatch传递给了((store.dispatch) => promise(thunk(loggerDispatch)))
 *              再执行thunk(),将劫持过的dispatch传给thunk，thunk执行掉第二层 将thunkDispatch传递给了 ((store.dispatch) => promise(thunkDispatch(loggerDispatch)))
 *              最后执行promise(), (action) => promiseDispatch(thunkDispatch(loggerDispatch))
 *
 * 最后的效果就是：
 *              promise中间件的promiseDispatch方法中的next是thunkDispatch
 *              thunk中间件的thunkDispatch方法中的next是loggerDispatch
 *
 *
 * 所以当用户派发action时 promise劫持的diapacth先执行 然后是thunk劫持的dispatch 最后是logger劫持的
 *
 *
 */
