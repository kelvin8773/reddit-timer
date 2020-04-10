import React from 'react';
import Info from './info';
import styles from './info.module.scss';

const InfoSection = () => (
  <div>
    <Info id="how-it-works" headline="How it works" className={styles.info}>
      <div className={styles.infoLine}>
        • We find the 500 top posts from the past year for a subreddit.
      </div>
      <div className={styles.infoLine}>
        • The data is visualized in a heatmap grouped by weekday and hour of the day.
      </div>
      <div className={styles.infoLine}>
        • See immediately when to submit your reddit post.
      </div>
    </Info>

    <Info id="about" headline="About" className={styles.info}>
      <div className={styles.infoLine}>
        This app was created during a course on
        <a href=" https://ooloo.io" className={styles.link}> ooloo.io </a>
        with the goal to implement a pixel-perfect real-world application with
        professional workflows and tools like Kanban, Asana, Zeplin, GitHub,
        pull requests and code reviews.&nbsp;
        <a href="https://ooloo.io/employers" className={styles.link}>
          Click here for more information.
        </a>
      </div>
    </Info>

  </div>
);

export default InfoSection;
