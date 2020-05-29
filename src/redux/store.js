import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './postsSlice';

export default configureStore({
  reducer: {
    posts: postsReducer,
  },
});
