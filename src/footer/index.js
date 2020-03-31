import React from 'react';
import {
  Link,
} from 'react-router-dom';

import styles from './footer.module.scss';
import { ReactComponent as Logo } from './sign.svg';

const Footer = () => (
  <div className={styles.footer}>
    <a href=" https://ooloo.io" className={styles.weblink}>
      ooloo.io
    </a>
    <Link to="/" className={styles.logolink}>
      <Logo />
    </Link>
    <Link to="/terms">
      Terms & Privacy
    </Link>
  </div>

);

export default Footer;
