import React from 'react';
import {
    Link,
} from 'react-router-dom';
import styles from './Navbar.module.scss';

const Navbar = () => (
    <div className={styles.Navbar}>
        <ul>
            <li>
                <Link to="/">
                    <img src="./assets/navbar/logo.svg"
                        alt="reddit logo"
                    />
                </Link>

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

);

export default Navbar;
