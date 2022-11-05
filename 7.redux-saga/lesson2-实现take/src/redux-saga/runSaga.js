import * as effectTypes from './effectTypes';

/**
 * 
 * @param {*} env {channel // 实现发布订阅的工具函数, dispatch // 原生dispatch方法, getState // 原生getState方法}
 * @param {*} saga 使用者传入的根saga 一个generator函数
 */
function runSaga(env, saga) {
    let { channel, dispatch, getState } = env;
    let it = saga(); // 生成迭代器
    
    // 这是redux saga的核心 驱动saga运行
    function next(val) {
        // 执行第一次派发(默认)： {effect: {type: 'TAKE', actionType: 'ASYNC_ADD'}, done: false }
        // 执行第二次派发： {effect: {type: 'PUT', action: {type: 'ADD'}}}
        let { value: effect, done } = it.next(val);
        if (!done) {
            switch (effect.type) {
                case effectTypes.TAKE:
                    // 卡在这里 等着派发ASNYN_ADD动作 effect = {type: 'TAKE', actionType: 'ASYNC_ADD'}
                    
                    // sagaMiddleware.run(rootSage) => 默认执行next() => 走到这里卡在这里 channel.on()添加对ASYNC_ADD的监听 =>
                    // 派发ASYNC_ADD => 走到sagaMiddleware劫持的diapatch中 => channel.trigger() => trigger()中执行next() =>
                    // 走到了PUT中 => 派发同步的action，修改页面值
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