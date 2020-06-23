import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import postsReducer from './postsSlice';

const store = configureStore({
  reducer: { posts: postsReducer },
  middleware: [thunk],
});

export default store;
