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

/**
 * 将要派发的action包装一下，是为了交给runSaga处理识别
 * @param {*} action { type: actionTypes.ADD } 用户定义的actionType
 * @returns runSaga能够识别的PUT指令对象
 */
export function put(action) {
    return { type: effectTypes.PUT, action };
}