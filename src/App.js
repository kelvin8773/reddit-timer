import React from 'react';
import {
  BrowserRouter,
} from 'react-router-dom';

import Styled from 'styled-components';
import Navbar from './components/navbar';
import Main from './pages';
import Footer from './components/footer';
import Theme from './stylesheets/theme/theme';
import GlobalStyle from './stylesheets/theme/global';

const AppContainer = Styled.div`
  width: 1440px;
  max-width: 100%;
  height: 100vh;
  margin: 0 auto;
  background-color: #ffffff;
`;

const App = () => (
  <Theme>
    <GlobalStyle />
    <AppContainer>
      <BrowserRouter>
        <Navbar />

        <Main />

        <Footer />
      </BrowserRouter>
    </AppContainer>
  </Theme>

);

export default App;
