// function compose(...funcs) {
//     return funcs.reduce((a, b) => (...args) => a(b(...args)));
// }


function compose(...funcs) {
  return funcs.reduce((a, b) => {
    // console.log(a.toString(), 'aaaaa');
    // console.log(b.toString());
    // console.log('===================', a, b)
    return (...args) => a(b(...args));
  })
}
export default compose;

/**
 * [promise, thunk, logger]
 *
 * 第一次循环： a=promise b=thunk
 * 返回 (...args) => promise(thunk(...args))
 * 这个函数是第二次的a
 *
 * 第二次循环： a=(...args) => promise(thunk(...args)) b=logger
 * 返回 (...args) => promise(thunk(logger(...args)))
 *
 *
 */
