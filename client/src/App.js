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
import CreateBug from './components/bugs/CreateBug'
import EditProject from './components/projects/EditProject'
import EditBug from './components/bugs/EditBug'
import FavoriteBugs from './components/bugs/FavoriteResults'
import JoinedProjects from './components/projects/JoinedResults'
import UserProfile from './components/users/Profile'
import InviteResults from './components/projects/InviteResults'
import ProjectSearch from './components/projects/ProjectSearch'
import UserSearch from './components/users/UserSearch'
import BugSearch from './components/bugs/BugSearch'

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
          <Route exact path="/project/:id/bugs/search" component={BugSearch}/>
          <Route exact path="/project/:id/bugs/:page" component={BugResults}/>
          <Route exact path="/project/:projectId/bug/:bugId" component={Bug}/>
          <Route exact path="/project/:projectId/bug/:bugId/comments/:page" component={Bug}/>
          <Route exact path="/projects/search" component={ProjectSearch}/>
          <Route exact path="/projects/:page" component={ProjectResults}/>
          <Route exact path="/users/search" component={UserSearch}/>
          <Route exact path="/users/:page" component={UserResults}/>
          <Route exact path="/user/:id" component={UserProfile}/>
          <PrivateRoute exact path="/dashboard" component={Dashboard}/>
          <PrivateRoute exact path="/favorites/:page" component={FavoriteBugs}/>
          <PrivateRoute exact path="/joined/:page" component={JoinedProjects}/>
          <PrivateRoute exact path="/invites/:page" component={InviteResults}/>
          <PrivateRoute exact path="/create-project" component={CreateProject}/>
          <PrivateRoute exact path="/project/:id/create-bug" component={CreateBug}/>
          <PrivateRoute exact path="/project/:id/edit" component={EditProject}/>
          <PrivateRoute exact path="/project/:projectId/bug/:bugId/edit" component={EditBug}/>
        </Switch>
      </BrowserRouter>
    </Provider>
  )
}

export default App;
