import actionTypes from '../actions/actionTypes'



const initState = {
  list: [{
      "userId": 1,
      "id": 1,
      "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
    },
    {
      "userId": 2,
      "id": 2,
      "title": "qui est esse",
      "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
    }
  ],
  isloading: false
}

export default (state = initState, action) => {
  console.log('执行了几次')
  switch (action.type) {
    case actionTypes.START_FETCH_BLOG_LIST:
      return {
        ...state,
        isloading: true
      }
      case actionTypes.START_BLOG_LIST_SUCCESS:
        return {
          ...state,
          isloading: false,
            list: action.payload.list
        }
        case actionTypes.START_BLOG_LIST_FAILED:
          return {
            ...state,
            isloading: false
          }
          default:
            return state
  }
}