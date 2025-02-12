/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLogin: false,
    tempUserData: null,
    token: '',
    userData: null,
  },
  reducers: {
    setLogin: (state, action) => {
      state.isLogin = action.payload;
    },
    setTempUserData: (state, action) => {
      state.tempUserData = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem('btelco_admin_panel', action.payload);
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setLogout: (state, action) => {
      state.isLogin = false;
      localStorage.removeItem('btelco_admin_panel');
      state.tempUserData = null;
      state.token = '';
      state.userData = null;
    }
  },
});

export const {
  setLogin, setLogout, setToken, setUserData, setTempUserData
} = authSlice.actions;

export default authSlice.reducer;
