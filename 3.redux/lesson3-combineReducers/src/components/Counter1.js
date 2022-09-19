import React from "react";
import store from "../store";
import actions from '../store/actions/counter1';
import {bindActionCreators} from "../redux";


// const actions = { add, minus };

// 第第一种用: bindActionCreators 传入一个对象，该对象包含多个生成action的函数
const boundActions = bindActionCreators(actions, store.dispatch);

// 第二种: bindActionCreators传入一个生成action的函数 返回一个函数 函数中是执行dispacth(action)
// const boundAdd = bindActionCreators(add, store.dispatch);
// const boundMinus = bindActionCreators(minus, store.dispatch);


export default class Counter1 extends React.Component {
    state = { number: 0 }
    componentDidMount() {
        this.unsubscirbe = store.subscribe(() => {
            console.log(store.getState(), '==================');
            this.setState({
                number: store.getState().counter1.number
            })
        })
    }
    componentWiiUnmount() {
        this.unsubscirbe();
    }
    render() {
        return <div>
            <p id="counterValue">{this.state.number}</p>
            <button id="counterAdd" onClick={boundActions.add1}>+</button>
            <button id="counterMinus" onClick={boundActions.minus1}>-</button>
        </div>
    }
}