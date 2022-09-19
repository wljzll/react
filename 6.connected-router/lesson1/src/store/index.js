import {createStore, applyMiddleware} from 'redux';
// 导入Router中间件
import {routerMiddleware} from 'connected-react-router';
import history from '../history';
import combineReducer  from './reducers';

const store = applyMiddleware(routerMiddleware(history))(createStore)(combineReducer);

export default store;