// 为了避免actionType重复，所以一般会把actionType放在一个文件里统一进行管理，
// 也可以避免写错actionType
import actionType from '../actions/actionType'

// 
const initState = [{
  id: 1,
  title: 'Apple',
  price: '8888.88',
  amount: 10
}, {
  id: 2,
  title: 'Orange',
  price: '9999.99',
  amount: 20
}]

// 创建购入车的reducer，reducer的固定写法是两个参数，第一个是state并有一个初始值，第二个是action
export default (state = initState, action) => {
  // 根据不同的action.type,做不同的处理，每次返回一个新的state，返回的类型要相同
  switch (action.type) {
    case actionType.CART_AMOUTN_INCREMENT:
      return state.map(item => {
        if (item.id === action.payload.id) {
          item.amount += 1
        }
        return item
      })

    case actionType.CART_AMOUTN_DECREMENT:
      return state.map(item => {
        if (item.id === action.payload.id) {
          item.amount -= 1
        }
        return item
      })
      // 一定要有default，当actionType不对的时候，不做处理，返回上一次的state
    default:
      return state
  }
}