import axios from 'axios';
import dayjs from 'dayjs';

// API Reference - https://reddit-api.readthedocs.io/en/latest/#searching-submissions

const BASE_URL = 'https://api.pushshift.io/reddit/submission/search/';

const getPosts = async (subreddit) => {
  const oneYearBefore = dayjs().subtract(1, 'years').unix();
  const numberOfPosts = 500;

  const url = `${BASE_URL}?subreddit=${subreddit}&after=${oneYearBefore}&size=${numberOfPosts}&sort=desc`;

  try {
    const response = await axios.get(url);
    if (response.status === 200 && response.data.data.length > 0) {
      return response.data.data;
    }
    throw new Error('No such subreddit!');
  } catch (error) {
    throw new Error(error.message);
  }
};

export default getPosts;
