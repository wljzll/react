import { createStore, applyMiddleware } from "redux";
import reducer from './reducer';
// 组件中的方法
import createSagaMiddleware from '../redux-saga';
// 自己写项目时需要传入的
import rootSage from './sagas';

// 创建saga中间件
let sagaMiddleware = createSagaMiddleware();


// let store = createStore(reducer);
// 创建store
let store = applyMiddleware(sagaMiddleware)(createStore)(reducer);
// 将saga运行起来
sagaMiddleware.run(rootSage);
export default store;