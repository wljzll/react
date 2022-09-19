import React from "react";
import {connect} from 'react-redux';
import actions from '../store/actions/counter';

class Counter extends React.Component {
    render() {
        return (
            <div>
                <h1>Counter</h1>
                <button onClick={() => this.props.goto('/')}>跳转到Home</button>
            </div>
        )
    }
}

let mapStateToProps = state => state.counter;
export default connect(mapStateToProps, actions)(Counter);