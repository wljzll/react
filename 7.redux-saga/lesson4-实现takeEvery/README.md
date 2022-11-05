## sage
- 实现异步加1操作
- 以前是通过redux-sage redux-promise实现的
- 通过redux-sage实现

```javascript
完整的项目流程
1、创建store仓库 - index.js 使用中间件等创建store
   1.1 创建actions生产要派发的动作类型, 搭配action-types.js
   1.2 创建reducer当仓库派发了action, 处理action动作类型返回处理后的state

2、在入口文件中将store引入, 通过store属性的方式传给Provider组件

```

### takeEvery的执行流程
```javascript
/**
 * 1. 创建store, 执行sagaMiddleware.run(rootSaga);
 * 2. sagaMiddleware.run(rootSaga)实际上是执行runSaga(env, saga);
 * 3. runSaga中解构出 channel/dispatch/getState
 * 4. 执行rootSaga这个生成器函数, 用it1接受返回的迭代器
 * 5. 定义next()方法
 * 6. 默认执行一次next()方法
 * 7. 执行迭代器it1.next(), 也就是执行rootSaga中的第一个yield语句后的addListener函数,
 *    addListener是一个生成器函数, 执行它返回一个迭代器, 所以it1.next()执行返回的是
 *    {value: effect1=addListener生成的迭代器, done: false}
 * 8. done=false; 进入分支, 由于effect1是一个迭代器, 递归调用runSaga()
 *
 * 9. 由于effect1是一个迭代器不做执行, 直接赋值给it2
 * 10. 默认执行一次next()方法
 * 11. 执行it2.next(), 也就是执行addListener的第一个yield语句后的takeEvery函数,
 *     takeEvery('ASYNC_ADD', addWorker) =>
 *     定义takeEveryHelper函数[take(actionType), fork(addWorker)] =>
 *     return fork(takeEveryHelper) =>
 *     也就是return {type: 'FORK', saga: takeEveryHelper}
 * 12. it2.next()的返回值就是 {value: {type: 'FORK', saga: takeEveryHelper}, done: false}
 * 13. done=false; 进入分支, 由于effect是FORK, 进入FORK分支
 * 14. 递归调用runSaga(env, takeEveryHelper)
 *
 * 15. takeEveryHelper是生成器函数, 执行takeEveryHelper()生成迭代器赋值给it3
 * 16. 默认执行next()方法
 * 17. 执行it3.next()也就是takeEveryHelper的第一个yield语句, 产出take
 *     {value: {type: 'TAKE', actionType: 'ASYNC_ADD'}, done: false}
 * 18. done=false; 进入分支, 进入TAKE判断, channel.on('ASYNC_ADD', next())
 *
 * 19. 执行13步fork分支后的next()函数, 13步对应的生成器是addListener()
 * 20. it2.next() => 产出 {value: undefined, done: true}
 * 21. 13步所在的runSaga的递归执行完成
 *
 * 22. 执行8步后的next()函数, 8步对应的生成器是 rootSaga
 * 23. it1.next() => 产出{value:undefined, done: true}
 * 24. 8步所在的runSaga的递归执行完了
 *
 * 至此初始化操作以及完成, 迭代器就卡在这里不执行了, 未执行完的迭代器是it3,
 * 对应的生成器是takeEveryHelper
 *
 * 用户派发了一个ASYNC_ADD的action
 * 1. 执行sagaMiddlewareDispatchFunc({type: "ASYNC_ADD"})
 * 2. 先执行原生的dispatch(), reducer里没有type: "ASYNC_ADD"的分支没什么效果
 * 3. 执行channer.trigger({type: "ASYNC_ADD"})
 * 4. 匹配上了18步收集的taker也就是it3迭代器的next(), 执行next()
 * 5. 执行it3.next() => 产出{value: {type: 'FORK', saga: addWorker}, done: false}
 * 6. 进入FORK分支, 递归调用runSaga
 * 7. addWorder是生成器函数, 执行返回迭代器it4
 * 8. 默认执行next()方法
 * 9. it4.next() => 产出{value: {type: 'ADD'}, done: false}
 * 10. 进入PUT分支, 调用sagaMiddlewareDispatchFunc({type: 'ADD'})
 * 11. 调用原生dispatch, 匹配了reducer, state中number+1
 * 12. channel.trigger({type: 'ADD'})不存在taker没效果
 * 13. 执行next()没有后续了, 这个runSaga就结束了
 * 14. 执行6步的next(), 对应的迭代器是it3, 对应的生成器是takeEveryHelper
 * 15. takeEveryHelper是while死循环, 又开启了监听
 */
```
