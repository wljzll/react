import * as effectTypes from './effectTypes';


/**
 * 生成指令对象的工厂函数
 * @param {*} actionType ASYNC_ADD
 * @returns {type: 'TAKE', actionType: 'ASYNC_ADD'}
 */
export function take(actionType) {
    // 这是一个发送给saga中间件的指令对象
    return { type: effectTypes.TAKE, actionType };
}

/**
 *
 * @param {*} action
 * @returns {type: 'PUT', action: {type: 'ADD'}}
 */
export function put(action) {
    return { type: effectTypes.PUT, action };
}
