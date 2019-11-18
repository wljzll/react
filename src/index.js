import React from 'react';
import { render } from 'react-dom';
import App from './App'


import { HashRouter, Route } from "react-router-dom";

render(
  <HashRouter>
    <Route component={App}></Route>
  </HashRouter>,
  document.querySelector('#root')
)
