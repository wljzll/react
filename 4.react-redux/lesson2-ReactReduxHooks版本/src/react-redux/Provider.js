import React from "react";
import ReactReduxContext from "./ReactReduxContext";

function Provider(props) {
    return (
        // index.js中将store通过属性的形式传递了过来
        <ReactReduxContext.Provider value={{ store: props.store }}>
            {props.children}
        </ReactReduxContext.Provider>
    )
}

export default Provider;