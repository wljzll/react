import React, { Component } from 'react'
import {Home, Artical, ArticalDetails, Users, NotFound} from './components'
import {Route, NavLink as Link, Redirect, Switch} from 'react-router-dom'



export default class App extends Component {
 
  render() {
    console.log(this.props)
    return (
      <div>
        <ul>
          <li><Link to="/home/?params=test">首页</Link></li>
          <li><Link to="/artical">文章</Link></li>
          <li><Link to="/users">用户</Link></li>
        </ul>
        <Switch>
          <Route  path="/home" render={(RouteProps)=>{
            return <Home {...RouteProps} x={1}/>
          }}/>
          <Route component={Artical} path="/artical" exact/>
          <Route component={ArticalDetails} path="/artical/:id"/>
          <Route component={Users} path="/users"/>
          <Route component={NotFound} path="/404"/>
          <Redirect from="/" to="/home" exact/>
          <Redirect to="/404" />
        </Switch>
      </div>
    )
  }
}
