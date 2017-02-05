import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import App from './components/App';
import RepsComponent from './components/RepsComponent';
import './index.css';

const Routes = (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="/location/:zip" component={RepsComponent} />
    </Route>
  </Router>
);

ReactDOM.render(Routes, document.getElementById('root'));
