import * as actionTypes from '../action-types';
import { put, take } from '../../redux-saga/effects';

// 监听saga
function* minusListener() {
    for (let i = 0; i < 2; i++) {
        yield take(actionTypes.ASYNC_MINUS);
        yield put({ type: actionTypes.MINUS });
    }
    return 'minus2次';
}

export default minusListener;