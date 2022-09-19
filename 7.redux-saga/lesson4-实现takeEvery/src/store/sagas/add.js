import * as actionTypes from '../action-types';
import { take, put, takeEvery } from '../../redux-saga/effects';

// worker saga
function* addWorker() {
    yield put({ type: actionTypes.ADD });
}

// 监听saga
function* addListener() {
    yield takeEvery(actionTypes.ASYNC_ADD, addWorker)
}

export default addListener;