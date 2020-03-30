import React from 'react';
import {
  Link,
} from 'react-router-dom';
import styles from './navbar.module.scss';
import logo from './logo.svg';

const Navbar = () => (
  <div className={styles.navbar}>
    <Link to="/" className="linkLogo">
      <img
        src={logo}
        alt="reddit logo"
      />
    </Link>

    <div className={styles.linkItems}>
      <Link to={{
        pathname: 'search',
        search: 'javascript',
      }}
        className={styles.linkItem}
      >
        Search
        </Link>

      <Link to={{
        pathname: '/',
        hash: '#how-it-work',
      }}
        className={styles.linkItem}
      >
        How it works
        </Link>

      <Link to={{
        pathname: '/',
        hash: '#about',
      }}
        className={styles.linkItem}
      >
        About
        </Link>

    </div>
  </div>

);

export default Navbar;
