import React, { Component } from 'react'
import {Route, Link, Redirect} from 'react-router-dom'
import {Home, Artical, Users, ArticalDetails} from './components'



export default class App extends Component {
  render() {
    return (
      <div>
        <ul>
          <li><Link to="/home">首页</Link></li>
          <li><Link to="/artical">文章</Link></li>
          <li><Link to="users">用户</Link></li>
        </ul>
        <Route component={Home} path="/home"></Route>
        <Route component={Artical} path="/artical"></Route>
        <Route component={Users} path="/users"></Route>
        <Route component={ArticalDetails} path="/articaldetails/:id"></Route>
        <Redirect to="/home" from="/"></Redirect>
      </div>
    )
  }
}
