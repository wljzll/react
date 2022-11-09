// 对标替代的是mapDispatchToProps

import React from 'react';
import ReactReduxContext from '../ReactReduxContext';

function useDispatch() {
  // 通过useContext取出store
  const { store } = React.useContext(ReactReduxContext);
  // 返回store的dispatch方法
  return store.dispatch;
}

export default useDispatch;
