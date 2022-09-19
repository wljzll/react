

import addListener from './add';

// // worker saga
// function* addWorker () {
//     yield put({ type: actionTypes.ADD });
// }

// // 监听saga
// function* addListener() {
//     yield takeEvery(actionTypes.ASYNC_ADD, addWorker)
// }

export default function* rootSage() {
    yield addListener();
}

// export default function* rootSage() {
//     // take相当于once 只执行一次 takeEvery相当于on
//     yield takeEvery(actionTypes.ASYNC_ADD, add);
// }

// export default function* rootSage() {
//     for (let i = 0; i < 3; i++) {
//         // 在此监听某个动作的发生, 如果有人派发ASYNC_ADD动作, 当前saga会继续执行 如果没有就卡在这里了
//         yield take(actionTypes.ASYNC_ADD); // {type: 'TAKE', actionType: 'ASYNC_ADD'}
//         // 派发一个真正的动作 store.dispatch({type: actionTypes.ADD})
//         yield add(); // {type: 'PUT', action: {type: 'ADD'}
//     }
// }


// export default function* rootSage() {
//     for (let i = 0; i < 3; i++) {
//         // 在此监听某个动作的发生, 如果有人派发ASYNC_ADD动作, 当前saga会继续执行 如果没有就卡在这里了
//         yield take(actionTypes.ASYNC_ADD); // {type: 'TAKE', actionType: 'ASYNC_ADD'}
//         // 派发一个真正的动作 store.dispatch({type: actionTypes.ADD})
//         yield put({ type: actionTypes.ADD }); // {type: 'PUT', action: {type: 'ADD'}}

//         // // 在此监听某个动作的发生, 如果有人派发ASYNC_ADD动作, 当前saga会继续执行 如果没有就卡在这里了
//         // yield take(actionTypes.ASYNC_MINUS);
//         // // 派发一个真正的动作 store.dispatch({type: actionTypes.ADD})
//         // yield put({ type: actionTypes.MINUS });
//     }
// }