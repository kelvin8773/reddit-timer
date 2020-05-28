import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './redux/postsSlice';

export default configureStore({
  reducer: {
    posts: postsReducer,
  },
});
