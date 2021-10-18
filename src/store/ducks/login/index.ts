import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import {
  UserLogin,
  SessionState,
  LoginRequest,
} from 'src/store/ducks/login/types';

const jsonUser = global.window.localStorage.getItem('dm_pr_relatorios_user');
const user = (jsonUser ? JSON.parse(jsonUser) : null) as UserLogin;

const initialState: SessionState = {
  user: user,
  authenticated: user !== null,
};

export const sessionSlice = createSlice({
  name: 'session',
  initialState: initialState,
  reducers: {
    loginRequest: (state, action: PayloadAction<LoginRequest>) => {},
    loginSuccess: (state, action: PayloadAction<UserLogin>) => {
      state.user = action.payload;
      state.authenticated = true;

      const jsonUser = JSON.stringify(action.payload);
      global.window.localStorage.setItem('dm_pr_relatorios_user', jsonUser);
    },
    logout: (state) => {
      state.user = null;
      state.authenticated = false;

      global.window.localStorage.removeItem('dm_pr_relatorios_user');
    },
  },
});

export const { loginRequest, loginSuccess, logout } = sessionSlice.actions;

export default sessionSlice.reducer;
