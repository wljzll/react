import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';

import history from './history';
import store from './store';
import Home from './components/Home';
import Counter from './components/Counter';


ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
        <Link to="/">Home</Link>
        <Link to="/counter">Counter</Link>
        <Route path="/" component={Home} exact={true} />
        <Route path="/counter" component={Counter} />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);

