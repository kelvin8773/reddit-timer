import React from 'react';
import {
  BrowserRouter as Router,
  Link,
} from 'react-router-dom';

import Main from './main';
import Footer from './footer';

const App = () => (
  <Router className="App">
    <div className="Navbar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/search">Search</Link>
        </li>
        <li>
          <Link to="/work">How it works</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </div>

    <Main />

    <Footer />
  </Router>
);

export default App;
