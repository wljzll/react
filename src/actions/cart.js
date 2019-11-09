import actionType from './actionType'

// action的两种写法

// 第一种写法是一个对象，这是标准的action，但是问题是不方便传递参数
  // export const increment = {
  //   type : actionType.CART_AMOUTN_INCREMENT
  // }

  // export const decrement = {
  //   type : actionType.CART_AMOUTN_DECREMENT
  // }


// 在工作中，常用的一种方式是使用actionCreator，他是一个方法，返回一个对象，这个对象才是
// 真正的action
export const increment = (id) => {

  return {
    type : actionType.CART_AMOUTN_INCREMENT,
    payload : {
      id
    }
  }
}

export const decrement = (id) => {

  return {
    type : actionType.CART_AMOUTN_DECREMENT,
    payload : {
      id
    }
  }
}