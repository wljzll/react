// 在实际项目中，由于只有单一的store，但是状态会有很多分类，所以我们需要划分reducer，
// create人Store的参数又只接受一个reducer，所以，redux比较聪明的提供了一个用于合并多个
// reducer的方法。注意：不要手动合并
import {combineReducers} from 'redux'

// 引入cart reducer，如果有多个，继续引入
import cart from './cart'

// 导出合并后的reducer
export default combineReducers({
  // 把多个reducer作为combineReducers对象传入，在外部就可以通过store.getState().cart
  // 来获取到cart reducer中的state
  cart
})