import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'
import App from './components/App'

render((
  <Router history={browserHistory}>
    <Route path="/(:year)" component={App} />
  </Router>
), document.getElementById('react-app'))
