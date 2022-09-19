import React from "react";
import Lifecycle from "./Lifecycle";
import RouterContext from "./RouterContext";


function Prompt({when, message}) {
    return (
        <RouterContext.Consumer>
            {
                (value) => {
                    // 如果没有传入when 就直接返回null 不渲染
                    if (!when) return null;
                    // 获取history的block方法
                    const block = value.history.block;
                    return (
                        <Lifecycle onMount={lifeCycleInstance => lifeCycleInstance.release = block(message)} onUnMount={lifeCycleInstance => lifeCycleInstance.release()} />
                    )
                }
            }
        </RouterContext.Consumer>
    )
}

export default Prompt;