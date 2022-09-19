import React from "react";
import { ReactReduxContext } from "react-redux";
import { Router } from "react-router";
import { onLocationChange } from './actions';

/**
 * 创建一个函数组件 把Route子组件渲染到Router组件中
 */
class ConnectedRouter extends React.PureComponent {
    static contextType = ReactReduxContext;
    constructor(props, context) {
        super(props);
        this.unlisten = props.history.listen((location, action) => {
            context.dispatch(onLocationChange);
        });
    }
    render() {
        let { history, children } = this.props;
        return (
            <Router history={history}>
                {children}
            </Router>
        )
    }
}

export default ConnectedRouter;

/**
 * ConnectedRouter：组件类型，用来包裹路由组件的
 */