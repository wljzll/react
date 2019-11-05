import React, { Component } from 'react'
import { connect } from 'react-redux'

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

export default connect(mapStateToProps, { increment, decrement })(CardList)