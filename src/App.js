import React from 'react';
import {
  BrowserRouter as Router,
} from 'react-router-dom';

import Navbar from './navbar';
import Main from './main';
import Footer from './footer';
import styles from './app.module.scss';


const App = () => (
  <div className={styles.App}>
    <Router>
      <Navbar />

      <Main />

      <Footer />
    </Router>
  </div>
);

export default App;
