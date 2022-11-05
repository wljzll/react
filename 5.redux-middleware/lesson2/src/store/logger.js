/**
 *
 * @param {*} dispatch 这里的dispatch是改造后的dispatch
 * @returns
 */
// 这里的dispatch都是Promise劫持的dispatch
 function logger({ getState, dispatch }) {
  return function (next) {
    // 为了实现中间件的级联 next表示调用下一个中间件 next是原生的dispatch
    console.log('先执行的是logger的劫持');
    function loggerDispatch (action) {
      // 这才是我们改造后的dispatch方法
      console.log('prev state', getState());
      next(action); // 如果只有一个中间件的话 next就是原始的dispatch
      console.log('next state', getState());
      return action;
    };
    return loggerDispatch; // loggerDispatch传递到thunk中间件中 为next形参的实参
  };
}
// function logger({ getState, dispatch }) {
//   return function (next) {
//     // 为了实现中间件的级联 next表示调用下一个中间件 next是原生的dispatch
//     console.log('先执行的是logger的劫持');
//     return function (action) {
//       // 这才是我们改造后的dispatch方法
//       console.log('prev state', getState());
//       next(action); // 如果只有一个中间件的话 next就是原始的dispatch
//       console.log('next state', getState());
//       return action;
//     };
//   };
// }

export default logger;
