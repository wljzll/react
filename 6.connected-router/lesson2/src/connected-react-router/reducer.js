import { LOCATION_CHANGE } from './actions';


function connectRouter(history) {
    let initialState = {
        loaction: history.loaction,
        action: history.action
    }
    return function (state = initialState, { type, payload }) {
        if (type === LOCATION_CHANGE) {
            let { location, action } = payload;
            return { ...state, location, action }
        } else {
            return state;
        }
    }
}
export default connectRouter;