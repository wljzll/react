import { combineReducers } from '../../redux';
import counter1 from './counter1';
import counter2 from './counter2';

let reducers = {
    counter1,
    counter2
}
let combinedReducer = combineReducers(reducers);

export default combinedReducer;

// 合并后的reducer
// let state = {
//     counter1: {
//         number: 1
//     },
//     counter2: {
//         number: 1
//     }
// }