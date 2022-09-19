import React from 'react';
import RouterContext from './RouterContext';
import matchPath from './matchPath';

class Route extends React.Component {
    static contextType = RouterContext; // 类组件源码处理了contextType静态属性
    render() {
        let { history, location } = this.context;
        // let { path, component: RouteComponent } = this.props;
        let { component: RouteComponent, computedMatch, render } = this.props;
        // let match = location.pathname === path; // 如果当前路径与Route传入的路径匹配上了
        const match = computedMatch ? computedMatch : matchPath(location.pathname, this.props);
        let renderElement = null;
        let routeProps = { history, location };
        if (match) {
            routeProps.match = match; // 如果当前的Route匹配上了 给routeProps上挂载一个match属性存放的是匹配的结果
            // renderElement = <RouteComponent {...routeProps} />
            if (RouteComponent) {
                renderElement = <RouteComponent {...routeProps} />
            } else if (render) {
                renderElement = render(routeProps);
            }
        } else {
            renderElement = null;
        }
        return renderElement;
    }
}

export default Route;