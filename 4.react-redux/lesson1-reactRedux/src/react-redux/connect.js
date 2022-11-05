
import React, { useContext, useLayoutEffect, useReducer, useMemo } from 'react';
import { bindActionCreators } from '../redux';
import ReactReduxContext from './ReactReduxContext';

/**
 *
 * @param {*} mapStateToProps 把仓库中对应的状态映射为当前组件的属性
 * @param {*} mapDispatchToProps 把派发动作的方法映射为当前组件的属性
 */
function connect(mapStateToProps, mapDispatchToProps) {
    return function (OldComponent) {
        return function (props) {
            // 通过react hooks取出store
            const { store } = useContext(ReactReduxContext);
            // 解构出store上的方法
            const { getState, dispatch, subscribe } = store;
            // 拿到当前的state
            const prevState = getState();
            // 传递给mapStateToProps方法 取出组件要映射的state
            const stateProps = useMemo(() => mapStateToProps(prevState), [prevState]);

            let dispatchProps = useMemo(() => {
                 let dispatchProps;
                // 如果mapDispatchToProps是函数是要生成dispatch方法的函数
                if (typeof mapDispatchToProps === 'function') {
                    /**
                     * (dispatch) => ({
                     *   add() {
                     *     dispatch({type: 'ADD1'})
                     *   }
                     * })
                     */
                    dispatchProps = mapDispatchToProps(dispatch);
                } else if (typeof mapDispatchToProps === 'object') { // 如果是对象就用bindActionCreators包装下
                    dispatchProps = bindActionCreators(mapDispatchToProps, dispatch);
                } else { // 否则就直接把dispatch返回
                    dispatchProps = { dispatch };
                }
                return dispatchProps;
            }, [dispatch]);


            // 模拟类组件的强制刷新方法 用户通过dispatch修改redux的state => 交给reducer处理 => 执行订阅的回调 => 订阅的回调是forceUpdate => 触发组件更新

            // const [, forceUpdate] = useReducer(x => {
            //   console.log(x, 'xxxx');
            //   return x + 1
            // }, 0);
            const reducer = x => x + 1;
            const [, forceUpdate] = useReducer(reducer, 0);
            useLayoutEffect(() => {
                // 如果仓库里的状态发生变化之后 就会执行forceUpdate 修改了state 组件就会更新
                return subscribe(forceUpdate)
            }, [subscribe]);

            return <OldComponent {...props} {...stateProps} {...dispatchProps} />
        }
    }
}


export default connect;
