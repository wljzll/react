import * as types from '../action-types'
/**
 * redux其实是吧所有的操作权限都交给了我们
 * @param {*} state 老状态
 * @param {*} action 动作对象 也是一个普通的JS对象 必须有个type属性 用来表示你想干什么
 */
 let initialState = { number: 0 };
 function reducer(state = initialState, action) {
     switch (action.type) {
         case types.ADD1:
             return { number: state.number + 1 };
             break;
         case types.MINUS1:
             return { number: state.number - 1 };
             break;
         default:
             return state;
             break;
     }
 }

 export default reducer;