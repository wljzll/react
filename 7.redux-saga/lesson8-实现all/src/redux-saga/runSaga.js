import * as effectTypes from './effectTypes';

/**
 * 
 * @param {*} env channel dispatch getState
 * @param {*} saga 可能是一个生成器也可能是一个迭代器 
 */
function runSaga(env, saga, callback) {
    let { channel, dispatch, getState } = env;
    // saga可能是生成器 也可能是迭代器
    let it = typeof saga === 'function' ? saga() : saga;

    function next(val, isError) {
        let result;
        if (isError) {
            result = it.throw(val);
        } else {
            result = it.next(val);
        }
        // 默认执行第一次： {effect: {type: 'TAKE', actionType: 'ASYNC_ADD'}, done: false }
        // 执行第二次派发： {effect: {type: 'PUT', action: {type: 'ADD'}}}
        // effect可能是{type:'', actionType/action: ''}, 也可能是{type: '', saga: ''}
        let { value: effect, done } = result;
        if (!done && !isError) {
            // 如果yield产出的是一个迭代器
            if (typeof effect[Symbol.iterator] === 'function') {
                runSaga(env, effect); // 这个就好比开启了一个子进程(实际不是子进程) 执行worker saga, 当前的saga继续执行
                next(); // 调用next就让当前的saga继续执行
            } else if (typeof effect.then === 'function') {
                effect.then(next);
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
                    case effectTypes.CALL:
                        effect.fn(...effect.args).then(next);
                        break;
                    case effectTypes.CPS:
                        effect.fn(...effect.args, (err, data) => {
                            if (err) {
                                next(err, true);
                            } else {
                                next(data);
                            }
                        });
                        break;
                    case effectTypes.ALl:
                        let effects = effect.effects;
                        let result = []; // 存放结果的数组
                        let completeCount = 0; // 完成任务的数量
                        effects.forEach((it, index) => {
                            runSaga(env, it, (itResult) => {
                                result[index] = itResult;
                                if (++completeCount === effects.length) { // 说明all中的任务全部执行完成
                                    next(result); // 可以让当前的 saga继续执行
                                }
                            });
                        })
                        break;
                    default:
                        break;
                }
            }
        } else { // done为true说明这个saga执行完成了
            callback && callback(effect);
        }
    }

    // 默认执行一次
    next();
}

export default runSaga;