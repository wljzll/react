import { createStore, applyMiddleware } from "redux";
import reducer from './reducer';
import createSagaMiddleware from '../redux-saga';
import rootSage from './sagas';

let sagaMiddleware = createSagaMiddleware();


// let store = createStore(reducer);
let store = applyMiddleware(sagaMiddleware)(createStore)(reducer);
sagaMiddleware.run(rootSage);
export default store;