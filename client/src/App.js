import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Landing from './components/layout/landing'
import About from './components/layout/about'
import Login from './components/auth/login'

function App() {
  return(
    <BrowserRouter>
      <Route exact path="/" component={Landing}/>
      <Switch>
        <Route exact path="/about" component={About}/>
        <Route exact path="/login" component={Login}/>
      </Switch>
    </BrowserRouter>
  )
}

export default App;
