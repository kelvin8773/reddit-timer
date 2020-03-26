import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';


import Home from './home';
import Search from './search';

const Main = () => (
  <div className="Main text-center">
    <Switch>
      <Route path="/search">
        <Search />
      </Route>

      <Route path="/">
        <Home />
      </Route>
    </Switch>
  </div>
);

export default Main;
