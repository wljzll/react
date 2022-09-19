import React from "react";
import { Router } from '../react-router';
import { createHashHistory } from 'history';

class BrowerRouter extends React.Component {
    constructor(props) {
        super(props)
        // 创建hashHistory
        this.history = createHashHistory(props);
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