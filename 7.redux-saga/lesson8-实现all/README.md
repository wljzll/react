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