import React from "react";
import store from "../store";

export default class Counter1 extends React.Component {
    state = { number: 0 }
    componentDidMount() {
        this.unsubscirbe = store.subscribe(() => {
            this.setState({
                number: store.getState().number
            })
        })
    }
    componentWiiUnmount() {
        this.unsubscirbe();
    }
    render() {
        return <div>
            <p id="counterValue">{this.state.number}</p>
            <button id="counterAdd" onClick={() => store.dispatch({ type: 'ADD' })}>+</button>
            <button id="counterMinus" onClick={() => store.dispatch({ type: 'MINUS' })}>-</button>
        </div>
    }
}