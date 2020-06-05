import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './postsSlice';
import thunk from 'redux-thunk';

const store = configureStore({
  reducer: { posts: postsReducer, },
  middleware: [thunk]
});

export default store; 