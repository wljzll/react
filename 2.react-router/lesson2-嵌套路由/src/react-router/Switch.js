import React from "react";
import RouterContext from "./RouterContext";
import matchPath from "./matchPath";

class Switch extends React.Component {
    // 类组件上使用React.context的上下文
    static contextType = RouterContext
    render() {
        // 从上下文中获取history的location对象
        const { location } = this.context;
        let element, match;
        // 遍历Switch组件中的每一个Route儿子组件
        React.Children.forEach(this.props.children, child => {
            // 一旦有一个匹配上了 后面就不再匹配了
            if (!match && React.isValidElement(child)) {
                element = child;
                // 看Route的path能不能和浏览器的url匹配上
                match = matchPath(location.pathname, child.props);
            }
        })
        return match ? React.cloneElement(element, { computedMatch: match }) : null;
    }
}

export default Switch;