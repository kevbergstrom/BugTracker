import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import PrivateRoute from './components/auth/PrivateRoute'

import Landing from './components/layout/Landing'
import About from './components/layout/About'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Project from './components/projects/Project'
import Dashboard from './components/dashboard/Dashboard'
import BugResults from './components/bugs/BugResults'

import { Provider } from 'react-redux'
import { checkAuth } from './actions/auth'
import store from './store'

const App = () => {
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
          <Route exact path="/project/:id" component={Project}/>
          <Route exact path="/project/:id/bugs/:page" component={BugResults}/>
          <PrivateRoute exact path="/dashboard" component={Dashboard}/>
        </Switch>
      </BrowserRouter>
    </Provider>
  )
}

export default App;
