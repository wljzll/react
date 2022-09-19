function createBrowerHistory() {
    let globalHistory = window.history; // 拿到老的history
    let listeners = [];

    // 自己实现的go方法
    function go(n) {
        // 调用原生的go方法
        globalHistory.go(n);
    }

    // 自己实现的goForward方法
    function goForward() {
        // 只是转发一层 调用原生的goForward
        globalHistory.goForward();
    }

    function goBack() {
        globalHistory.goBack();
    }

    // 每次渲染Router组件时都会调用history.listen(listener)
    // listener函数参数中调用了setState()方法 触发了组件更新
    function listen(listener) {
        // 收集listener
        listeners.push(listener);
        // 返回一个取消监听函数 如果调用它的话会把此监听函数从数组中删除
        return function () {
            listeners = listeners.filter(l => l !== listener);
        }
    }
    window.addEventListener('popstate', (event) => {
        setState({ action: 'POP', location: { state: event.state, pathname: window.location.pathname } })
    })
    function setState(newState) {
        // 通过合并 更新history对象的action和location属性
        Object.assign(history, newState);
        // 添加或者更新history对象的length属性
        history.length = globalHistory.length;
        // 遍历Rotuer收集的listener: 原则上一个页面只有一个总的Router
        // listener中会调用setState(location)触发页面更新
        listeners.forEach(listener => listener(history.location));
    }

    /**
     * 
     * @param {*} path 跳转的路径
     * @param {*} state 跳转时携带的状态
     */
    function push(path, state) { // 对比的是history的pushState方法
        const action = "PUSH";
        globalHistory.push(state, null, path);
        // 组装一个location
        let location = { state, pathname: path };
        // 通过调用setState方法更新history对象
        setState({ action, location });
    }
    const history = {
        action: 'POP', // 对history执行的动作
        push,
        go,
        goBack,
        goForward,
        listen,
        location: { pathname: window.location.pathname, state: globalHistory.state }
    }
    return history;
}

export default createBrowerHistory;