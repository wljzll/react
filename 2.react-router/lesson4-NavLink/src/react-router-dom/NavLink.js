import React from "react";
// import { Route } from '../react-router';
import matchPath from "../react-router/matchPath";
import { _RouterContext as RouterContext } from "../react-router";
import Link from "./Link";


function NavLink(props) {
    // 获取context
    let context = React.useContext(RouterContext);
    // 解构出location对象
    let { location: { pathname } } = context;
    // 解构NavLink传入的各种属性
    const {
        to: path,//Link指向的路径
        className: classNameProp = '',//基本的类名
        style: styleProp = {},//基本的行内样式
        activeClassName = 'active',//激活的类名
        activeStyle = {},//激活的行内样式
        children,//儿子
        exact//是否要精确匹配
    } = props;
    //pathname浏览器的路径 path来自于NavLink的配置 匹配上了就是Active
    let isActive = matchPath(pathname, { path, exact });
    // 匹配上了添加激活类名 active
    let className = isActive ? joinClassNames(classNameProp, activeClassName) : classNameProp;
    // 匹配上了添加激活style
    let style = isActive ? { ...styleProp, ...activeStyle } : styleProp;
    // 构建一个对象传递给Link
    let linkProps = {
        className,
        style,
        to: path,
        children
    }
    return <Link {...linkProps} />;
}

function joinClassNames(...classnames) {
    return classnames.filter(c => c).join(' ');
}
export default NavLink;