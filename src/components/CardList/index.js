import React, { Component } from 'react'
// connect方法执行之后是一个高阶组件，
import { connect } from 'react-redux'


// 导入actionCreators
import { increment, decrement } from '../../actions/cart'

class CardList extends Component {

  render() {
    console.log(this.props)
    return (
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>商品名称</th>
            <th>价格</th>
            <th>数量</th>
            <th>操作</th>
          </tr>
        </thead>

        <tbody>
          {
            this.props.cardList.map(item => {
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.title}</td>
                  <td>{item.price}</td>
                  <td>{item.amount}</td>
                  <td>
                    <button onClick={
                      this.props.decrement.bind(this, item.id)
                    }>-</button>
                    <span>{item.amount}</span>
                    <button onClick={
                      this.props.increment.bind(this, item.id)
                    }>+</button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>

      </table>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    cardList: state.cart
  }
}


// connect方法有四个参数，常用的就是前面两个：
// 第一个参数是 mapStateToProps, 作用就是从store里把state注入到当前组件的props上
// 第二个参数可以是 mapDispatchToProps,这个的主要作用是把action生成的方法注入到当前的组件的props上，一般来说没必要这样用

// 直接第二个参数传递一个
export default connect(mapStateToProps, { increment, decrement })(CardList)