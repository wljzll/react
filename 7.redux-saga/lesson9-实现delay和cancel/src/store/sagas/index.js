import { put, fork, delay, take, cancel } from '../../redux-saga/effects';
import * as actionTypes from '../action-types';


function* add() {
    while (true) {
        yield delay(1000);
        yield put({ type: actionTypes.ADD });
    }
}


function* addListener() {
    // task就是一个fork出来的子进程的任务的描述
    const task = yield fork(add);
    console.log(task, '===============task===============');
    yield take(actionTypes.STOP); // 等待STOP动作发生
    yield cancel(task); // 等到了就让task停止
}

export default function* rootSage() {
    yield addListener();
}
