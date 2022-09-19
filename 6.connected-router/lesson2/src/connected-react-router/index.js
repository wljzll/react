// 可以把路由的最新的信息放到仓库里保存
// 在ConnectedRouter里会监听路径变化 并在变化的时候派发动作给仓库 通过reducer保存信息
export { default as ConnectedRouter } from './ConnectedRouter';
export { default as connectRouter } from './reducer';

// 下面这两个方法是用来跳转路径的
export { default as routerMiddleware } from './middleware';
export { push } from './actions';