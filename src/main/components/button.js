import React from 'react';
import PropTypes from 'prop-types';
import {
  Link,
} from 'react-router-dom';
import styles from './button.module.scss';

const Button = ({ children, linkTo }) => (
  <div className={styles.button}>
    <Link to={linkTo} className={styles.text}>
      {children}
    </Link>
  </div>
)

Button.protoType = {
  children: PropTypes.string.isRequired,
  linkTo: PropTypes.object.isRequired,
}

export default Button;
