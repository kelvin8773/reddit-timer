import React from 'react';
import PropTypes from 'prop-types';
import styles from './info.module.scss';

const Info = ({ id, headline, children }) => (
  <div id={id} className={styles.info}>
    <h3 className={styles.headline}>{headline}</h3>
    {children}
  </div>
);

Info.propTypes = {
  id: PropTypes.string.isRequired,
  headline: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Info;
