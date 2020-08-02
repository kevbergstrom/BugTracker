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
import Bug from './components/bugs/Bug'
import ProjectResults from './components/projects/ProjectResults'
import UserResults from './components/users/UserResults'
import CreateProject from './components/projects/CreateProject'
import MemberResults from './components/projects/MemberResults'

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
          <Route exact path="/project/:id/members/:page" component={MemberResults}/>
          <Route exact path="/project/:id/bugs/:page" component={BugResults}/>
          <Route exact path="/project/:projectId/bug/:bugId" component={Bug}/>
          <Route exact path="/project/:projectId/bug/:bugId/comments/:page" component={Bug}/>
          <Route exact path="/projects/:page" component={ProjectResults}/>
          <Route exact path="/users/:page" component={UserResults}/>
          <PrivateRoute exact path="/dashboard" component={Dashboard}/>
          <PrivateRoute exact path="/create-project" component={CreateProject}/>
        </Switch>
      </BrowserRouter>
    </Provider>
  )
}

export default App;
