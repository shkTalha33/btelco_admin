/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const ThemeSlice = createSlice({
  name: 'themeDart',
  initialState: {
    theme: 'light',
  },
  reducers: {
    setThemeDark: (state, action) => {
      state.theme = action.payload;
    }
  },
});

export const { setThemeDark } = ThemeSlice.actions;

export default ThemeSlice.reducer;
