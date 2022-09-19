
import * as actionTypes from './action-types';

function reducer(state = { number: 0 }, action) {
    switch (action.type) {
        case actionTypes.ADD:
            return { number: state.number + 1 };
            break;
        case actionTypes.MINUS:
            return { number: state.number - 1 };
            break;
        default:
            return state;
            break;
    }
}

export default reducer;