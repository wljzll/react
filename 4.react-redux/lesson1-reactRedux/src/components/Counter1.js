import React from "react";
import actions from '../store/actions/counter1';
import { connect } from '../react-redux';


class Counter1 extends React.Component {
    render() {
        return <div>
            <p id="counterValue">{this.props.number}</p>
            <button id="counterAdd" onClick={this.props.add1}>+</button>
            <button id="counterMinus" onClick={this.props.minus1}>-</button>
        </div>
    }
}

// 从总状态中取出counter1的state 并映射成为Counter1的属性对象
let mapStateToProps = (state) => state.counter1;
// actions经过绑定也会成为Counter1的属性对象
let mapDispatchToProps = actions;

export default connect(mapStateToProps, actions)(Counter1);