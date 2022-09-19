import React from 'react';
import RouterContext from './RouterContext';

class Router extends React.Component {
    static computeRootMatch(pathname) {
        return { path: "/", url: "/", params: {}, isExact: pathname === "/" }
    }
    constructor(props) {
        super(props);
        // 组装一个state属性
        this.state = {
            location: props.history.location // 取hash或browser传递过来的history对象
        }
        // 每次渲染Router组件都会收集一个函数参数
        // 当路径发生变化后会执行这个函数参数并传入最新的路径
        this.unlisten = props.history.listen((location) => {
            this.setState({ location }); // 调用setState触发更新
        })
    }
    // Router组件卸载时 销毁相关回调
    componentWillUnmount() {
        this.unlisten();
    }
    render() {
        // 组装一个对象有两个键值对：history&location
        let value = {
            location: this.state.location,
            history: this.props.history,
            match: Router.computeRootMatch(this.state.location.pathname)
        }
        return (
            <RouterContext.Provider value={value}>
                {this.props.children}
            </RouterContext.Provider>
        )
    }
}

export default Router;

/**
 * HashRouter/HistoryRouter中使用Router组件
 * Route组件是渲染到HashRouter/HistoryRouter中的
 * 然后透传给Router组件, 最终还是渲染到Router组件中
 * 
 * 为什么还要包一层HashRouter/History? 因为要传递history对象
 */