import React from "react";
import RouterContext from "../react-router/RouterContext";

export default function Link(props) {
    return (
        <RouterContext.Consumer>
            {
                contextValue => {
                    return (
                        <a {...props} onClick={
                            (event) => {
                                event.preventDefault();
                                contextValue.history.push(props.to);
                            }
                        }>
                            {props.children}
                        </a>
                    )
                }
            }
        </RouterContext.Consumer>
    )
}