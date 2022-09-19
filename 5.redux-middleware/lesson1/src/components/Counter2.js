import React from "react";
import actions from '../store/actions/counter2';
import { useSelector, useBoundDispatch } from '../react-redux';


// class Counter2 extends React.Component {
//     render() {
//         return <div>
//             <p id="counterValue">{this.props.number}</p>
//             <button id="counterAdd" onClick={this.props.add2}>+</button>
//             <button id="counterMinus" onClick={this.props.minus2}>-</button>
//         </div>
//     }
// }

// 改用hooks
function Counter2(props) {
    let { number } = useSelector((state) => state.counter2);
    // let dispatch = useDispatch();
    let boundActions = useBoundDispatch(actions);
    return (<div>
        <p id="counterValue">{number}</p>
        <button id="counterAdd" onClick={boundActions.add2}>+</button>
        <button id="counterMinus" onClick={boundActions.minus2}>-</button>
    </div>)
}

export default Counter2;

// // 从总状态中取出counter1的state 并映射成为Counter1的属性对象
// let mapStateToProps = (state) => state.counter2;
// // actions经过绑定也会成为Counter1的属性对象
// let mapDispatchToProps = actions;

// export default connect(mapStateToProps, actions)(Counter2);