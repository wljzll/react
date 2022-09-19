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


export function call(fn, ...args) {
    return { type: effectTypes.CALL, fn, args };
}

export function cps(fn, ...args) {
    return { type: effectTypes.CPS, fn, args };
}

export function all(effects) {
    return { type: effectTypes.ALL, effects };
}

export function cancel(task) {
    return { type: effectTypes.CANCEL, task };
}

function delayP(ms, val = true) {
    const promise = new Promise(resolve => {
        setTimeout(resolve, ms);
    })
    return promise;
}

export const delay = call.bind(null, delayP); 
// 调用delay(fn, 1000); => {type: 'call', fn: delayP, args} 其中args=[1000]
