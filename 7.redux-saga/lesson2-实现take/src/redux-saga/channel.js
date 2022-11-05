
/**
 * 
 * @returns 返回on trigger方法实现发布订阅
 */
function stdChannel() {
    let currentTakers = [];
    //  actionType 等待的动作类型  taker 等到之后执行处理函数 next
    function on(actionType, taker) {
        taker.actionType = actionType; // ASYNC_ADD

        taker.cancel = () => {
            currentTakers = currentTakers.filter(item => item !== taker);
        }
        currentTakers.push(taker);
    }

    function trigger(action) {
        currentTakers.forEach(taker => {
            // 如果派发的动作类型和taker的动作类型相同 就执行这个taker
            if (taker.actionType === action.type) {
                taker.cancel();
                taker(action);
            }
        })
    }

    return {
        on,
        trigger
    }
}

export default stdChannel;