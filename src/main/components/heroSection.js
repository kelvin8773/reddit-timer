import React from 'react';
import {
  Link,
} from 'react-router-dom';
import Button from './button';
import styles from './hero.module.scss';
import heatMap from './table.png';

const HeroSection = () => (
  <div id="hero-section" className={styles.hero}>
    <div className={styles.heroTitle}>
      No reactions to your reddit posts?
    </div>

    <div className={styles.subTitle}>
      Great timing, great results! Find the best time to post on your subreddit.
    </div>

    <div className={styles.heroButton}>
      <Button linkTo={{
        pathname: 'search',
        search: 'javascript',
      }}
      >
        SHOW ME THE BEST TIME
      </Button>
    </div>

    <div className={styles.searchValue}>
      r/javascript
    </div>

    <Link to={{
      pathname: 'search',
      search: 'javascript',
    }}
    >
      <img
        src={heatMap}
        alt="heat map"
        className={styles.heatMap}
      />
    </Link>

  </div>


);

export default HeroSection;
