import React from 'react';
import {
  BrowserRouter as Router,
} from 'react-router-dom';

import Navbar from './navbar';
import Main from './main';
import Footer from './footer';
import Styled from 'styled-components';


const AppContainer = Styled.div`
  width: 1440px;
  max-width: 100%;
  height: 100vh;
  background-color: #ffffff;
`;

const App = () => (
  <AppContainer>
    <Router>
      <Navbar />

      <Main />

      <Footer />
    </Router>
  </AppContainer>
);

export default App;
