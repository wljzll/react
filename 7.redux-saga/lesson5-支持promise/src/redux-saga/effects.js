import * as effectTypes from './effectTypes';


/**
 * 生成指令对象的工厂函数
 * @param {*} actionType ASYNC_ADD
 * @returns 
 */
export function take(actionType) {
    // 这是一个发送给saga中间件的指令对象
    return { type: effectTypes.TAKE, actionType };
}

export function put(action) {
    return { type: effectTypes.PUT, action };
}

/**
 * 作用：生成动作类型的工厂函数
 * @param {*} saga 生成器函数
 * @returns 
 */
export function fork(saga) {
    return { type: effectTypes.FORK, saga };
}

/**
 * 当监听到某个动作类型的时候，开启新的子进程执行saga
 * @param {*} actionType 动作类型 
 * @param {*} saga work saga 生成器
 * @returns 
 */
export function takeEvery(actionType, saga) {
    function* takeEveryHelper() {
        while (true) {
            yield take(actionType);
            yield fork(saga);
        }
    }

    return fork(takeEveryHelper); // {type: effectTypes.FORK, saga: takeEveryHelper}
}