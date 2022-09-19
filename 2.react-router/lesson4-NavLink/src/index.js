
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter as Router, Route, Switch, Redirect, NavLink } from './react-router-dom';

import Home from './components/Home';
import User from './components/User';
import Profile from './components/Profile';
import Protected from './components/Protected';
import Login from './components/Login';

// 源码
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <ul>
      <li><NavLink className="strong" style={{ textDecoration: 'line-through' }} activeStyle={{ color: 'red' }} to="/" exact>首页</NavLink></li>
      <li><NavLink activeStyle={{ color: 'red' }} to="/user">用户管理</NavLink></li>
      <li><NavLink activeStyle={{ color: 'red' }} to="/profile">个人中心</NavLink></li>
    </ul>
    <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/user" component={User} />
      {/* <Route path="/profile" component={Profile} /> */}
      <Protected path="/profile" component={Profile} />
      <Route path="/login" component={Login} />
      <Redirect to="/" />
    </Switch>
  </Router>
);

