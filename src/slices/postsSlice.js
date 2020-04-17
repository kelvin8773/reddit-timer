import { createSlice } from '@reduxjs/toolkit';
import getPosts from '../helper/reddit_api';

const slice = createSlice({
  name: 'posts',
  initialState: [],
  reducers: {
    updatePosts(state, action) {
      const { payload } = action;
      return payload;
    },
  },
});

export async function fetchPosts(subreddit) {
  const posts = await getPosts(subreddit);
  return posts;
}

export const {
  updatePosts,
} = slice.actions;

export default slice.reducer;
