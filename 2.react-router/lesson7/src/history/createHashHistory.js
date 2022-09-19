function createHashHistory() {
    // 为什么要模拟H5的history对象, 因为要统一路由的使用方法和API
    /********* 这里是模拟H5的history对象 ********/
    let stack = []; // 模拟H5的history历史栈 每一次跳转的loaction
    let index = -1; // 模拟一个H5的history的当前索引
    let action = 'POP';
    let state; // 当前状态
    let listeners = []; // 监听函数的数组
    let currentMessage; // 保存调用block对象时传入的message方法
    /********* 这里是模拟H5的history对象 ********/

    function go(n) { // go方法是在栈中跳前跳后
        action = "POP";
        index += n;
        if (index < 0) { // 当前路由已经是栈底了没法退了
            index = 0;
        } else if (index >= stack.length) { // 已经是栈顶了 没法进了
            index = stack.length - 1;
        }
        // 取出下一个要跳转的路径location对象
        let nextLoaction = stack[index];
        // 给state赋值
        state = nextLoaction.state;
        window.location.hash = nextLoaction.pathname; // 用新的路径名改变地址栏中的hash值
    }

    function goForward() {
        go(1);
    }

    function goBack() {
        go(-1);
    }
    let listener = () => {
        let pathname = window.location.hash.slice(1); // /user#/api => slice拿到的是 /api
        Object.assign(history, { pathname, location: { pathname, state } });
        if (action === "PUSH") { // 如果是push操作 覆盖当前索引的上一个路径或者是在栈顶新加一个 所以不能用数组的push方法
            stack[++index] = history.location;
        }
        listeners.forEach(listener => listener(history.location));
    }
    window.addEventListener('hashchange', listener);

    function listen(listener) {
        listeners.push(listener);
        // 返回一个销毁函数
        return function () {
            // 通过过滤将要销毁的listener过滤出去
            listeners = listeners.filter(l => l !== listener);
        }
    }

    function push(to, nextState) {
        action = "PUSH";
        let pathname;
        // state = nextState;
        if (typeof to === 'object') {
            state = to.state;
            pathname = to.pathname
        } else {
            pathname = to;
            state = nextState;
        }
        // 如果有message方法则要调用
        if (currentMessage) {
            let message = currentMessage({
                pathname
            });
            let allow = window.confirm(message);
            if (!allow) return;
        }
        window.location.hash = pathname;
    }

    function block(newMessage) {
        currentMessage = newMessage;
        return () => {
            currentMessage = null;
        }
    }

    const history = {
        action: 'POP', // 对history执行的动作
        push,
        go,
        goBack,
        goForward,
        listen,
        location: { pathname: window.location.hash.slice(1), state: undefined },
        block
    }

    // 在当前页面刷新 hash值是没变化的 这里手动调用下让页面刷新
    action = "PUSH";
    if (!window.location.hash) {
        window.location.hash = '#/'
    }

    listener();
    return history;
}

export default createHashHistory;