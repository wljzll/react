import React from "react";
import { bindActionCreators } from "../../redux";
import ReactReduxContext from "../ReactReduxContext";

/**
 * 
 * @param {*} actions 传入的actions
 * @returns 
 */
function useBoundDispatch(actions) {
    const { store } = React.useContext(ReactReduxContext);
    // 将actions和dispatch绑定起来
    let boundActions = bindActionCreators(actions, store.dispatch);
    return boundActions;
}

export default useBoundDispatch;