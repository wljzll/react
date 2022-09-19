
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter as Router, Route, Switch, Redirect, Link, useHistory, useLocation, useParams, useRouteMatch } from './react-router-dom';

function Home() {
  return <div>首页</div>
}

function UserDetail() {
  let params = useParams();
  console.log('params', params);

  let location = useLocation();
  console.log('location', location);

  let history = useHistory();
  console.log('history', history);

  return <div>User Id: {params.id} <br />name: {location.state.name}</div>
}

function Post() {
  let match = useRouteMatch({
    path: '/post/:id',
    strict: true,
    sensitive: true
  });
  console.log('match', match);
  return match ? <div>id: {match.params.id}</div> : <div>Not Found</div>
}

// 源码
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <div>
      <ul>
        <li><Link to="/">首页</Link></li>
        <li><Link to={{pathname: '/user/detail/1', state: {id: 1, name: '珠峰架构'}}}>用户详情1</Link></li>
        <li><Link to="/post/1">帖子</Link></li>
      </ul>
      <Route path="/" component={Home} />
      <Route path="/user/detail/:id" component={UserDetail} />
      <Route path="/post/:id" component={Post} />
    </div>
  </Router>
);

