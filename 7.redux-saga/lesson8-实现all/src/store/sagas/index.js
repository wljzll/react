
import {all} from '../../redux-saga/effects';
import addListener from './add';
import minusListener from './minus';

export default function* rootSage() {
    let result = yield all([addListener(), minusListener()]);
    console.log('done', result);
}
