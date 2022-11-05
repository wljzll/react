import * as effectTypes from './effectTypes';

function runSaga(env, saga) {
    let { channel, dispatch, getState } = env;

    // 1. 生成迭代器
    let it = saga();

    // next是自定义的驱动saga执行的函数 和CO库的原理一样
    function next(val) {
        // 默认执行第一次： {effect: {type: 'TAKE', actionType: 'ASYNC_ADD'}, done: false }
        // 执行第二次派发： {effect: {type: 'PUT', action: {type: 'ADD'}}}
        let { value: effect, done } = it.next(val);
        if (!done) {
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
                default:
                    break;
            }
        }
    }
    // 默认执行一次
    next();
}

export default runSaga;
