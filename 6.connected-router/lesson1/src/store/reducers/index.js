import { combineReducers } from "redux";
import { connectRouter } from 'connected-react-router';
import history from "../../history";

let reducers = {
    router: connectRouter(history)
}
let combineReducer = combineReducers(reducers);

export default combineReducer;