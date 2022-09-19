
/**
 * 创建仓库的方法 返回一个仓库 仓库就是一个JS对象
 * @param {*} reducer 根据老状态　计算下一个新状态
 */
const createStore = (reducer) => {
    console.log(reducer, 'ssssssssss');
    let state; // 可以存放任何内容
    let listeners = [];

    // 获取最新的state
    function getState() {
        return state;
    }

    // 派发action 交给reducer处理 改变state
    function dispatch(action) {
        state = reducer(state, action);
        // 每次修改过状态都更新回调函数
        listeners.forEach(listener => listener());
    }

    // 收集state改变后要执行的回调 发布订阅模式
    function subscribe(listener) {
        listeners.push(listener);
        // 返回一个销毁函数
        return () => {
            listeners = listeners.filter(l => l !== listener);
        }
    }
    dispatch({ type: '@@REDUX/INIT' }); // 默认调用一次 初始化一下state

    return {
        getState,
        dispatch,
        subscribe
    }
}

export default createStore;