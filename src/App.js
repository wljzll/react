import React, { Component } from 'react'
import {CardList} from './components/index'



export default class App extends Component {
  render() {
    return (
      <div>
        <CardList {...this.props}/>
      </div>
    )
  }
}
