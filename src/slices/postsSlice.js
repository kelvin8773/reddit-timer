import { createSlice } from '@reduxjs/toolkit';

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

export const {
  updatePosts,
} = slice.actions;

export default slice.reducer;
