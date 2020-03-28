import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';


import Home from './home';
import Search from './search';
import styles from './Main.module.scss'

const Main = () => (
  <div className={styles.Main}>
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
