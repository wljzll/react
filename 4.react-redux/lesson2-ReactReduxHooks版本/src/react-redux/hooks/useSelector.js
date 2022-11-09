// 对标替代的是mapStateToProps

import React from "react";
import ReactReduxContext from "../ReactReduxContext";

/**
 *
 * @param {*} selector 开发者传递的获取state的方法
 * @param {*} store 仓库
 * @returns
 */
function useSelectorWithStore(selector, store) {
    // 从仓库中解构出两个方法
    let { subscribe, getState } = store;
    // 执行forceUpdate会触发组件更新
    const [, forceUpdate] = React.useReducer(x => x + 1, 0);
    // 获取最新的状态
    let state = getState();
    // 调用开发者传递的方法 取到开发者想要获取的state
    let selectedState = selector(state);
    // state发生变化时调用forceUpdate方法 修改state 触发组件更新
    React.useLayoutEffect(() => {
        return subscribe(forceUpdate);
    }, [subscribe]);
    return selectedState;
}

/**
 *
 * @param {*} selector 函数参数 这个函数参数接受state作为参数
 * @returns
 */
function useSelector(selector) {
    // 取出store
    const { store } = React.useContext(ReactReduxContext);
    // 执行selector取出对应的state
    const selectedState = useSelectorWithStore(selector, store);
    // 返回对应的state
    return selectedState;
}

export default useSelector;
