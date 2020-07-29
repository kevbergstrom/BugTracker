import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Landing from './components/layout/landing'
import About from './components/layout/about'

function App() {
  return(
    <BrowserRouter>
      <Route exact path="/" component={Landing}/>
      <Switch>
        <Route exact path="/about" component={About}/>
      </Switch>
    </BrowserRouter>
  )
}

export default App;
