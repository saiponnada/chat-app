import React from 'react';
import {Route, Switch } from 'react-router-dom';
import PageNotFound from './components/Common/PageNotFound';
import Join from './components/Join/Join';
import Chat from './components/Chat/Chat';

const App = () => (
  <Switch>
    <Route path="/" exact component={Join} />
    <Route path="/chat/:id" component={Chat} />
    <Route component={PageNotFound} />
  </Switch>
);

export default App;