import React from "react";
import { Router } from '../react-router';
import { createBrowserHistory } from 'history';

class BrowerRouter extends React.Component {
    constructor(props) { // 这里的props一般是没有的
        super(props)
        // 创建hashHistory
        this.history = createBrowserHistory(props);
    }
    render() {
        return (
            // 传递给Router组件
            <Router history={this.history}>
                {this.props.children}
            </Router>
        )
    }
}

export default BrowerRouter;
