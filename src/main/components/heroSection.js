import React from 'react';
import {
  Link,
} from 'react-router-dom';
import Button from './button';
import styles from './hero.module.scss';
import heatMap from './table.png';
import searchJson from '../../config/search.json';

const destinatin = `/search?${searchJson.default}`;

const HeroSection = () => (
  <div id="hero-section" className={styles.hero}>
    <h1 className={styles.heroTitle}>
      No reactions to your reddit posts?
    </h1>

    <h4 className={styles.subTitle}>
      Great timing, great results! Find the best time to post on your subreddit.
    </h4>

    <div className={styles.heroButton}>
      <Link to={destinatin}>
        <Button>
          Show me the best time
        </Button>
      </Link>
    </div>


    <div className={styles.searchValue}>
      r/
      {searchJson.default}
    </div>

    <Link to={destinatin}>
      <img
        src={heatMap}
        alt="heat map"
        className={styles.heatMap}
      />
    </Link>

  </div>
);

export default HeroSection;
