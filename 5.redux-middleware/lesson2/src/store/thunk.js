/**
 *
 * thunk中间件可以让我们派发函数 function
 * 默认情况下只能派发普通对象
 * @returns
 */

// 这里的dispatch是promiseDispatch
function thunk({ getState, dispatch }) {
  return function (next) {
    // 为了实现中间件的级联 next表示调用下一个中间件 next是原生的dispatch 在这里next是logger中间件的loggerDispatch方法
    console.log('然后是thunk的劫持');
    function thunkDispatch(action) {
      // 这才是我们改造后的dispatch方法
      console.log('thunk 2222');
      // 如果派发的action是函数就执行这个函数
      if (typeof action === 'function') {
        debugger;
        // 在这个我们自定义的action 函数里会调用真正的diaptch做一些逻辑处理
        return action(dispatch, getState);
      }
      return next(action);
    }
    return thunkDispatch; // thunkDispatch传递到promise中间件 作为next形参的实参
  };
}

// function thunk({ getState, dispatch }) {
//     return function (next) { // 为了实现中间件的级联 next表示调用下一个中间件 next是原生的dispatch
//       console.log('然后是thunk的劫持');
//         return function (action) { // 这才是我们改造后的dispatch方法
//             console.log('thunk 2222');
//             // 如果派发的action是函数就执行这个函数
//             if (typeof action === 'function') {
//                 // 在这个我们自定义的action 函数里会调用真正的diaptch做一些逻辑处理
//                 return action(dispatch, getState);
//             }
//             return next(action);
//         }
//     }
// }

export default thunk;
