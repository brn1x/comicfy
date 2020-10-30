import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import Setup from './pages/Setup';


export default function Routes () {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/config" exact component={Setup} />
      </Switch>
    </BrowserRouter>
  )
}