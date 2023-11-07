import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: null,
  userInfo: {},
};

const authSlice = createSlice({
  initialState,
  name: 'auth',
  reducers: {
    setLoginStatus(state, {payload}) {
      state.isLoggedIn = payload;
    },
    setUserInfo(state, {payload}) {
      state.userInfo = payload;
    },
  },
});

export const {setLoginStatus, setUserInfo} = authSlice.actions;
export default authSlice.reducer;
