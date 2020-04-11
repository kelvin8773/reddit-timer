import React from 'react';
import {
  BrowserRouter as Router,
} from 'react-router-dom';

import Styled from 'styled-components';
import Navbar from './navbar';
import Main from './main';
import Footer from './footer';
import Theme from './config/theme/theme';
import GlobalStyle from './config/theme/global';

const AppContainer = Styled.div`
  width: 1440px;
  max-width: 100%;
  height: 100vh;
  background-color: #ffffff;
`;

const App = () => (
  <Theme>
    <GlobalStyle />
    <AppContainer>
      <Router>
        <Navbar />

        <Main />

        <Footer />
      </Router>
    </AppContainer>
  </Theme>

);

export default App;
