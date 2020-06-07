import axios from 'axios';
import dayjs from 'dayjs';

console.log('use Real api');

// API Reference - https://reddit-api.readthedocs.io/en/latest/#searching-submissions

const BASE_URL = 'https://api.pushshift.io/reddit/submission/search/';

const getPosts = async (subreddit) => {
  const oneYearBefore = dayjs().subtract(1, 'years').unix();
  const numberOfPosts = 500;

  const url = `${BASE_URL}?subreddit=${subreddit}&after=${oneYearBefore}&size=${numberOfPosts}&sort=desc&sort_type=score`;

  try {
    const response = await axios.get(url);
    if (response.status === 200) {
      return response.data.data;
    }
    throw new Error('Network Error, Check Again!');
  } catch (error) {
    throw new Error(error.message);
  }
};

export default getPosts;
