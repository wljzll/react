


function applyMiddleware(...middlewares) {
  return function (createStore) {
    // 传入的是reducer/combineReducer
    return function (reducer) {
      // 1. 创建store
      let store = createStore(reducer);

      // 2. 声明dispatch
      let dispatch;

      // 3. 构建一个getState和dispatch方法的对象
      let middlewareAPI = {
        getState: store.getState,
        dispatch: (action) => dispatch(action) // 比较巧妙的一个处理 这里的dispatch就是最后一个中间件的返回的劫持dispatch函数
      }

      // 4. 处理中间件: 遍历所有中间件 执行掉中间件的第一层函数 并将构造的middlewareAPI传入
      // 这里需要注意, 所有中间件闭包保存的dispatch方法都是最后一个中间件返回的劫持dispatch的函数
      // 执行完每个中间件的第一层后 返回的是中间件的第二层函数
      let chain = middlewares.map(middleware => middleware(middlewareAPI));

      // 5. 这里的compose处理是非常巧妙和难以理解的,
      // compose处理完成后返回的是 (...args) => promiseMiddleFunc(thunkMiddelFunc(loggerMiddleFunc(...args)))
      // (...args) => promiseMiddleFunc(thunkMiddelFunc(loggerMiddleFunc(...args))) args就是原生的store.dispatch
      dispatch = compose(...chain)(store.dispatch);

      // 6. 处理完成后 返回一个store 其中dispatch是被劫持的 其他的没变
      return {
        ...store,
        dispatch
      }
    };
  };
}
