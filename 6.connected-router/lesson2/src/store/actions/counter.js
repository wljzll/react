import { push } from '../../connected-react-router';
const actions = {
    goto(path) {
        // 我需要在这个地方跳转到新的路径里
        return push(path); // 返回一个action动作对象
        // 返回的动作对象长这样
        // {
        //     type: CALL_HISTROY_METHOD,
        //         payload: {
        //         method: 'push',
        //         args: [path]
        //     }
        // }
    }
}

export default actions;