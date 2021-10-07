import { createSlice } from '@reduxjs/toolkit';

import { SessionState } from 'src/store/ducks/login/types';

const initialState: SessionState = {
  authenticated: false,
};

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    login: (state) => {
      state.authenticated = true;
    },
    logout: (state) => {
      state.authenticated = false;
    },
  },
});

export const { login, logout } = sessionSlice.actions;

export default sessionSlice.reducer;
