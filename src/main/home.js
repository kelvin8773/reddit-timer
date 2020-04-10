import React from 'react';
import styles from './home.module.scss';
import InfoSection from './components/info/infoSection';
import HeroSection from './components/hero/heroSection';

const Home = () => (
  <div className={styles.home}>
    <HeroSection />
    <InfoSection />
  </div>

);

export default Home;
