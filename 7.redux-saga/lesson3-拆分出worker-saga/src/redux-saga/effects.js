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