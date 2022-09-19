import React from "react";
import { Router } from '../react-router';
import { createHashHistory } from '../history';

class HashRouter extends React.Component {
    constructor(props) {
        super(props)
        // 创建hashHistory
        this.history = createHashHistory();
    }
    render() {
        return (
            // 将还history对象传递给Router组件
            <Router history={this.history}>
                {this.props.children}
            </Router>
        )
    }
}

export default HashRouter;

// 组件内接收到的路由对象
// {
//     history: {
//         action: "POP",
//         push: ƒ push(path, state),
//         replace: ƒ replace(path, state),
//         block: ƒ block(prompt),
//         createHref: ƒ createHref(location),
//         go: ƒ go(n),
//         goBack: ƒ goBack(),
//         goForward: ƒ goForward(),
//         listen: ƒ listen(listener),
//         length: 3,
//         location: {pathname: '/user', search: '', hash: '', state: undefined},
//     },
//     location: {pathname: '/user', search: '', hash: '', state: undefined},
// }