import axios from 'axios';
import dayjs from 'dayjs';

// eslint-disable-next-line no-console
console.log('use real API');

// API Reference - https://reddit-api.readthedocs.io/en/latest/#searching-submissions

const BASE_URL = 'https://api.pushshift.io/reddit/submission/search/';

const getPosts = async (subreddit) => {
  const oneYearBefore = dayjs().subtract(1, 'years').unix();
  const numberOfPosts = 500;

  const url = `${BASE_URL}?subreddit=${subreddit}&after=${oneYearBefore}&size=${numberOfPosts}&sort=desc&sort_type=score`;

  try {
    const response = await axios.get(url);
    if (response.status === 200) {
      return response.data.data.reduce((result, post) => {
        result.push({
          id: post.id,
          title: post.title,
          full_link: post.full_link,
          created_utc: post.created_utc,
          score: post.score,
          num_comments: post.num_comments,
          author: post.author,
        });
        return result;
      }, []);
    }
  } catch (error) {
    throw new Error(error.message);
  }
  return null;
};

export default getPosts;
