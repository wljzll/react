import { CALL_HISTROY_METHOD } from './actions'

function routerMiddleware(history) {
    return function (middlewareAPI) { // middlewareAPI={getState, dispatch}
        return function (next) { // 原始的dispatch方法
            return function (action) {
                if (action.type !== CALL_HISTROY_METHOD) { // 如果不是connectRouter定义的action格式
                    return next(action);
                }
                // 从action上解构出method:'push', args = [path]
                const { payload: { method, args } } = action;
                // 调用原生的history的method
                history[method](...args);
            }
        }
    }
}

export default routerMiddleware;