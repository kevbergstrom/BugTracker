import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Landing from './components/layout/landing'
import About from './components/layout/about'
import Login from './components/auth/login'
import Signup from './components/auth/signup'

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
        </Switch>
      </BrowserRouter>
    </Provider>
  )
}

export default App;
