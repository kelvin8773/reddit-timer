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
);

Button.propTypes = {
  children: PropTypes.node.isRequired,
  linkTo: PropTypes.objectOf([
    PropTypes.string.isRequired,
    PropTypes.string.isRequired,
  ]).isRequired,
};

export default Button;
