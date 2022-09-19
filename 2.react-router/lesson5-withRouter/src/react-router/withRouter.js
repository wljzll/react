import React from "react";
import RouterContext from "./RouterContext";

/**
 * withRouter的原理就是通过Consumer给普通组件传入history对象
 * 那么这个被包装的组件就获得了history的能力
 * @param {*} OldComponent 要包装的组件 
 * @returns 
 */
function withRouter(OldComponent) {
    return props => {
        // 通过Consumer拿到history对象
        return <RouterContext.Consumer>
            {
                contextValue => {
                    return <OldComponent {...props} {...contextValue} />
                }
            }
        </RouterContext.Consumer>
    }
}

export default withRouter;