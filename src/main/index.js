import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';

import Home from './pages/home';
import Search from './pages/search';
import Styled from 'styled-components';

const StyledMain = Styled.div`
    min-height: calc(100vh - 200px);
`;

const Main = () => (
  <StyledMain>
    <Switch>
      <Route path="/search">
        <Search />
      </Route>

      <Route path="/">
        <Home />
      </Route>
    </Switch>
  </StyledMain>
);

export default Main;
