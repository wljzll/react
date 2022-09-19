import * as actionTypes from '../action-types';
import { put, takeEvery, cps } from '../../redux-saga/effects';


// // 实现支持promise
// const delay = (ms) => new Promise(function (resolve, reject) {
//     setTimeout(() => {
//         resolve();
//     }, ms);
// })

const delay = (ms, callback) => {
    setTimeout(() => {
        const result = Math.random();
        if (result > 0.5) {
            callback(null, result);
        } else {
            callback('太小了', result)
        }
    }, ms);
}

// worker saga
function* addWorker() {
    let data = yield cps(delay, 1000);
    console.log(data, '==============');
    yield put({ type: actionTypes.ADD });
}


// function* addWorker() {
//     yield call(delay, 1000);
//     yield put({ type: actionTypes.ADD });
// }

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