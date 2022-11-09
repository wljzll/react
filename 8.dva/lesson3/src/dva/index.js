import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import * as sagaEffects from 'redux-saga/effects';
import prefixNamespace from './prefixNamespace';
export { connect };

function dva() {
  const app = {
    model,
    _models: [],
    router,
    _router: null,
    start,
  };

  let initialReducers = {};

  function model(model) {
    // 给reducers中的reducer函数添加命名空间前缀: add => counter1/add
    const prefixedModel = prefixNamespace(model);
    // 收集每个model
    app._models.push(prefixedModel);
    return prefixedModel;
  }

  function router(router) {
    app._router = router;
  }

  function start(selector) {
    for (const model of app._models) {
      // 将不同命名空间的reducer定义在不同的obj中
      initialReducers[model.namespace] = getReducer(model);
    }

    // 合并reducer
    let rootReducer = createReducer();
    const sagas = getSagas(app);

    // 创建store
    let store = createStore(rootReducer);
    // 渲染页面
    ReactDOM.render(
      <Provider store={store}>{app._router()}</Provider>,
      document.querySelector(selector)
    );

    // 合并reducer
    function createReducer() {
      return combineReducers(initialReducers);
    }

    function getSagas(app) {
      let sagas = [];
      for (const model of app._models) {
        sagas.push(getSaga(model));
      }
      return sagas;
    }
  }

  function getSaga(model) {
    // 拿到effects
    const { effects } = model;
    return function* () {
      for (const key in effects) {
        // key=asyncAdd
        yield sagaEffects.takeEvery(key, function* (action) {
          yield effects[key](action, {
            ...sagaEffects,
            put: (action) =>
              sagaEffects.put({
                ...action,
                type: prefixType(action.type, model.namespace),
              }),
          });
        });
      }
    };
  }
  function prefixType(type, model) {
    if (type.indexOf('/') === -1) {
      return `${model.namespace}/${type}`;
    }
    return type;
  }

  /**
   *
   * @param {*} model app.model()传入的数据
   * @returns
   */
  function getReducer(model) {
    let { reducers, state: initialState } = model;
    // 返回一个reducer函数 这个类似runtime的感觉
    // 当派发action时 执行这个函数 看model定义的reducers中是否有对应的actionType 的reducer函数 如果有就执行并返回处理后的state 如果没有就直接返回state
    // 每一个model都会形成一个闭包 派发action时才会执行这个函数尝试去取对应的reducer
    let reducer = (state = initialState, action) => {
      let reducer = reducers[action.type];
      if (reducer) {
        return reducer(state, action);
      } else {
        return state;
      }
    };

    return reducer;
  }

  return app;
}

export default dva;
