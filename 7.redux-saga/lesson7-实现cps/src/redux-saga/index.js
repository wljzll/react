
// 用来驱动saga执行
import runSaga from './runSaga';
// channel用来实现我们的发布订阅
import stdChannel from './channel';


function createSagaMiddleware() {
    const channel = stdChannel();
    let boundRunSaga;
    function sagaMiddleware({ getState, dispatch }) {
        boundRunSaga = runSaga.bind(null, { channel, dispatch, getState })
        return function (next) {
            return function (action) { // 改造后劫持的store.dispatch方法
                const result = next(action);
                // 有动作派发 去trigger收集的数组
                channel.trigger(action);
                return result;
            }
        }
    }

    sagaMiddleware.run = (saga) => boundRunSaga(saga);
    return sagaMiddleware;
}

export default createSagaMiddleware;