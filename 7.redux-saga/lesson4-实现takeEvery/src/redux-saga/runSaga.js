import * as effectTypes from './effectTypes';

/**
 *
 * @param {*} env channel dispatch getState
 * @param {*} saga 可能是一个生成器也可能是一个迭代器
 *                 初始化时是用户定义的rootSaga
 *                 非初始化时可能是用户定义的监听Saga或者workerSaga
 */
function runSaga(env, saga) {
    let { channel, dispatch, getState } = env;
    // saga可能是生成器 也可能是迭代器
    let it = typeof saga === 'function' ? saga() : saga;

    function next(val) {
        // 默认执行第一次： {effect: {type: 'TAKE', actionType: 'ASYNC_ADD'}, done: false }
        // 执行第二次派发： {effect: {type: 'PUT', action: {type: 'ADD'}}}
        // effect可能是{type:'', actionType/action: ''}, 也可能是{type: '', saga: ''}
        let { value: effect, done } = it.next(val);
        console.log(effect, 'xxxxxxxxxxxxxxxxxxxxx');
        if (!done) {
            // 如果yield产出的是一个迭代器
            if (typeof effect[Symbol.iterator] === 'function') {
                runSaga(env, effect); // 这个就好比开启了一个子进程(实际不是子进程) 执行worker saga, 当前的saga继续执行
                next(); // 调用next就让当前的saga继续执行
            } else {
                switch (effect.type) {
                    case effectTypes.TAKE:
                        // 卡在这里 等着派发ASNYN_ADD动作
                        // effect = {type: 'TAKE', actionType: 'ASYNC_ADD'}
                        channel.on(effect.actionType, next);
                        break;
                    case effectTypes.PUT:
                        // effect = {type: 'PUT', action: {type: 'ADD'}}
                        dispatch(effect.action);
                        // 派发了也要执行下一次 不确定还有没有yeild
                        next();
                        break;
                    case effectTypes.FORK:
                        runSaga(env, effect.saga); // 递归重新开启一个迭代器执行effect这个saga 有点类似开启一个子进程
                        next(); // 此saga继续执行 不会被这个类似子进程的saga卡住
                        break;
                    default:
                        break;
                }
            }
        }
    }
    // 默认执行一次
    next();
}

export default runSaga;
