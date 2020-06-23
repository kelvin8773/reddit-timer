import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';

import Styled from 'styled-components';

import Home from './home';
import Search from './search';

const StyledMain = Styled.div`
    min-height: calc(100vh - 200px);
`;

const Main = () => (
  <StyledMain role="main">
    <Switch>
      <Route path="/search/:redditName">
        <Search />
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  </StyledMain>
);

export default Main;
