import { createStore } from './redux'
let counterValue = document.getElementById('counterValue');
let counterAdd = document.getElementById('counterAdd');
let counterMinus = document.getElementById('counterMinus');

/**
 * redux其实是吧所有的操作权限都交给了我们
 * @param {*} state 老状态
 * @param {*} action 动作对象 也是一个普通的JS对象 必须有个type属性 用来表示你想干什么
 */
function reducer(state = 0, action) {
    switch (action.type) {
        case 'ADD':
            return state + 1;
            break;
        case "MINUS":
            return state - 1;
            break;
        default:
            return state;
            break;
    }
}
let store = createStore(reducer);

function render() {
    counterValue.innerHTML = store.getState();
}
render();
store.subscribe(render);

// console.log(store);
// console.log(store.getState());
// store.dispatch({ type: 'ADD' });
// console.log(store.getState());
counterAdd.addEventListener('click', () => {
    store.dispatch({ type: "ADD" });
})

counterMinus.addEventListener('click', () => {
    store.dispatch({ type: "MINUS" });
})