import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

const initialState = {
  authState: false,
  userData: null,

};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthState(state, action) {
      state.authState = action.payload;
    },
    setUserData(state, action) {
      state.userData = action.payload;
    },

    extraReducers: {
      [HYDRATE]: (state, action) => {
        return {
          ...state,
          ...action.payload.auth,
        };
      },
    },
  },
});

export const {
  setAuthState,
  setUserData,
} = authSlice.actions;
export const selectAuthState = (state) => state.auth.authState;
export const selectUserData = (state) => state.auth.userData;
export default authSlice.reducer;
