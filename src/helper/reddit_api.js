import axios from 'axios';
import moment from 'moment';

// API Reference - https://reddit-api.readthedocs.io/en/latest/#searching-submissions

const BASE_URL = 'https://api.pushshift.io/reddit/submission/search/';
const NOW = moment();

const getPosts = async (subreddit) => {
  const ONE_YEAR_BEFORE = NOW.subtract(1, 'years').unix();
  const QTY = 500;

  const NEW_URL = `${BASE_URL}?subreddit=${subreddit}&after=${ONE_YEAR_BEFORE}&size=${QTY}`;

  try {
    const response = await axios.get(NEW_URL);
    if (response.status === 200) {
      const posts = response.data.data;
      return posts;
    }
    throw new Error('No such subreddit!');
  } catch (error) {
    throw new Error(error.message);
  }
};


export default getPosts;
