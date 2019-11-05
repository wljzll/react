import actionType from './actionType'


// export const increment = {
//   type : actionType.CART_AMOUTN_INCREMENT
// }

// export const decrement = {
//   type : actionType.CART_AMOUTN_DECREMENT
// }

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