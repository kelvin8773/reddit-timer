import React from 'react';
import {
  Link,
} from 'react-router-dom';
import styles from './Navbar.module.scss';

const Navbar = () => (
  <div className={styles.Navbar}>
    <Link to="/">
      <img
        src="./assets/navbar/logo.svg"
        alt="reddit logo"
      />
    </Link>
    <ul>
      <li>
        <Link to={{
          pathname: 'search',
          search: 'javascript',
        }}
        >
          Search
        </Link>
      </li>

      <li>
        <Link to={{
          pathname: '/',
          hash: '#how-it-work',
        }}
        >
          How it works
        </Link>
      </li>
      <li>
        <Link to={{
          pathname: '/',
          hash: '#about',
        }}
        >
          About
        </Link>
      </li>
    </ul>
  </div>

);

export default Navbar;
