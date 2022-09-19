import * as actionTypes from '../action-types';
import { put, takeEvery, call } from '../../redux-saga/effects';


// 实现支持promise
const delay = (ms) => new Promise(function (resolve, reject) {
    setTimeout(() => {
        resolve();
    }, ms);
})

// worker saga

function* addWorker() {
    yield call(delay, 1000);
    yield put({ type: actionTypes.ADD });
}

// function* addWorker() {
//     yield delay(1000);
//     yield put({ type: actionTypes.ADD });
// }

// function* addWorker() {
//     yield put({ type: actionTypes.ADD });
// }

// 监听saga
function* addListener() {
    yield takeEvery(actionTypes.ASYNC_ADD, addWorker)
}

export default addListener;