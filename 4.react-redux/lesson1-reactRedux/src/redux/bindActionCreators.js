
/**
 * 作用就是执行创建action的函数生成action 然后将action传给dispatch
 * @param {*} actionCreator 创建action的函数
 * @param {*} dispatch dispatch方法
 * @returns 
 */
function bindActionCreator(actionCreator, dispatch) {
    return function (...args) {
        return dispatch(actionCreator.apply(this, args))
    }
}


/**
 * bindActionCreators 的目的是为了简洁
 * @param {*} actionCreators action的创建者对象 {add: f, minus: f}
 * @param {*} dispatch 派发动作的方法 store提供的
 */
export default function bindActionCreators(actionCreators, dispatch) {
    if (typeof actionCreators === 'function') {
        return bindActionCreator(actionCreators, dispatch);
    }
    const boundActionCreators = {};
    // 遍历actionCreators
    for (const key in actionCreators) {
        // 拿到每一个actionCreator
        const actionCreator = actionCreators[key];
        if (typeof actionCreator === 'function') {
            boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
        }
    }

    return boundActionCreators;
}

// 将actionCreators包装成这个样子
// boundActionCreators = {
//     add: dispatch({ type: 'ADD' }),
//     minus: dispatch({ type: 'MINUS' })
// }