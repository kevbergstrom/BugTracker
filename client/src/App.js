import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Landing from './components/layout/landing'

function App() {
  return(
    <BrowserRouter>
      <Route exact path="/" component={Landing}/>
    </BrowserRouter>
  )
}

export default App;
