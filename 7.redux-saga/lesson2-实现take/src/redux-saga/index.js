// 用来驱动saga执行
import runSaga from './runSaga';
// channel用来实现我们的发布订阅
import stdChannel from './channel';

function createSagaMiddleware() {
  const channel = stdChannel();
  let boundRunSaga;

  // 1. 这里是sagaMiddleware 这个dispatch是sagaMiddleDispatch
  function sagaMiddleware({ getState, dispatch }) {
    // 2. 给runSaga传递第一个参数 channel dispatch: sagaMiddleDispatch getState
    boundRunSaga = runSaga.bind(null, { channel, dispatch, getState });
    // 这个next是原生的dispatch或级联后上一个中间件的劫持后的dispatch方法
    return function (next) {
      // 2. 劫持原生的dispatch
      function sagaMiddleDispatch(action) {
        // 不是rootSaga派发的action直接交给原生的dispatch派发
        const result = next(action);
        // 有动作派发 去trigger收集的数组
        channel.trigger(action);
        return result;
      }
      //
      return sagaMiddleDispatch;
    };
  }

  sagaMiddleware.run = (saga) => boundRunSaga(saga);
  return sagaMiddleware;
}

export default createSagaMiddleware;
