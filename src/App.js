import React from 'react';
import {
  BrowserRouter as Router,
} from 'react-router-dom';

import Navbar from './navbar';
import Main from './main';
import Footer from './footer';


const App = () => (
  <Router className="App">
    <Navbar />

    <Main />

    <Footer />
  </Router>
);

export default App;
