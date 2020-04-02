import React from 'react';
import styles from './home.module.scss';

const Home = () => (
  <div className={styles.home}>
    <div id="how-it-works" className={styles.howItWorks}>
      <h3>
        How it works
      </h3>

      <p>
        • We find the 500 top posts from the past year for a subreddit.
      </p>
      <p>
        • The data is visualized in a heatmap grouped by weekday and hour of the day.
      </p>
      <p>
        • See immediately when to submit your reddit post.
      </p>

    </div>

    <div id="about" className={styles.about}>
      <h3>
        About
      </h3>

      <p>
        <div>
          This app was created during a course on
          <a href=" https://ooloo.io" className={styles.link}> ooloo.io </a>
          with the goal to implement a pixel-perfect
        </div>
        <div />
        real-world application with professional workflows and tools like Kanban, Asana, Zeplin,
        <div>
          GitHub, pull requests and code reviews.&nbsp;
          <a href="https://ooloo.io/employers" className={styles.link}>
            Click here for more information.
          </a>
        </div>
      </p>

    </div>


  </div>
);

export default Home;
