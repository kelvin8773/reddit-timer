import React, { Children } from 'react';
import styles from './info.module.scss';

const Info = ({ id, headline, children }) => (
    <div id={id} className={styles.info}>
        <h3 className={styles.headline}>{headline}</h3>
        {children}
    </div>
);

export default Info;
