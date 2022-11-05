### compose函数执行分析
```javascript
// 以三个中间件: logger thunk promise 为例
function compose(...funcs) {
  return funcs.reduce((a, b) => {
    return (...args) => a(b(...args));
  })
}

// 传递个compose的是已经执行掉第一层的三个中间件 funcs = [promiseMiddleFunc, thunkMiddleFunc, loggerMiddleFunc]

/** reduce的callback的执行的逻辑:
 * 第一次执行:
 *           a = promiseMiddleFunc;
 *           b = thunkMiddleFunc;
 *           返回 (...args) => promiseMiddleFunc(thunkMiddleFunc(...args))
 *
 * 第二次执行:
 *           a =  (...args) => promiseMiddleFunc(thunkMiddleFunc(...args));
 *           b = loggerMiddleFunc;
 *           返回 (...args) => promiseMiddleFunc(thunkMiddelFunc(loggerMiddleFunc(...args)))
 * 至此, compose处理完成
 */
```

## applyMiddleware执行分析:
```javascript
// dispatch = compose(...chain)(store.dispatch);
// compose(...chain) => (...args) => promiseMiddleFunc(thunkMiddelFunc(loggerMiddleFunc(...args)))

/**
 *  执行 (...args) => promiseMiddleFunc(thunkMiddelFunc(loggerMiddleFunc(...args)))
 *
 *  第一步: 执行loggerMiddleFunc(store.dispatch) => 返回loggerDispatch 最后一个中间件接受的是原生的dispatch
 *  第二步: 执行thunkMiddleFunc(loggerDispatch)  => 返回thunkDispatch
 *  第三步: 执行promiseMiddleFunc(thunkDispatch) => 返回promsieDispatch
 *
 *  applyMiddleware中 dispatch = compose(...chain)(store.dispatch); 这个dispatch就是promiseDispatch
 *
 *  比如我们现在派发一个函数式action:
 *  第一步: 调用promiseDispatch, 不是Promise, promiseDispatch直接调用next()也就是thunkDispatch处理
 *  第二步: thunkDispatch能处理, 处理完成后调用dispatch()往下走, 这个dispatch实际上是promiseDispatch, 又回到了promsieDispatch
 *  第三步: promiseDispatch还是直接调用next()交给thunkDispatch
 *  第四步: 这时候action不是函数了 thunkDispatch直接调用next()也就是loggerDispatch
 *  第五步: loggerDispatch输出了日志 调用原生的dispatch结束流程
 */

```
