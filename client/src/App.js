import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import PrivateRoute from './components/auth/PrivateRoute'

import Landing from './components/layout/Landing'
import About from './components/layout/About'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Dashboard from './components/dashboard/Dashboard'

import { Provider } from 'react-redux'
import { checkAuth } from './actions/auth'
import store from './store'

function App() {
  // Check for ongoing session
  useEffect(() => {
    store.dispatch(checkAuth())
  },[])

  return(
    <Provider store={store}>
      <BrowserRouter>
        <Route exact path="/" component={Landing}/>
        <Switch>
          <Route exact path="/about" component={About}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/signup" component={Signup}/>
          <PrivateRoute exact path="/dashboard" component={Dashboard}/>
        </Switch>
      </BrowserRouter>
    </Provider>
  )
}

export default App;
