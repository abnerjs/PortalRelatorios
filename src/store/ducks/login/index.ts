import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import {
  Objeto,
  Sistema,
  UserLogin,
  SessionState,
  LoginRequest,
} from 'src/store/ducks/login/types';
import { ErrorAPI } from '../types';

const jsonUser = global.window.localStorage.getItem('dm_pr_relatorios_user');
const user = (jsonUser ? JSON.parse(jsonUser) : null) as UserLogin;

const initialState: SessionState = {
  user: user,
  objetos: getObjetos(user?.lstSistemas ?? []),
  authenticated: user !== null,
  error: undefined,
  loading: false,
};

function getObjetos(lstSistemas: Array<Sistema>): Array<Objeto> {
  const objetos: Array<Objeto> = [];

  lstSistemas?.forEach((sistema) =>
    sistema.lstTiposObjetos?.forEach((tipoObjeto) =>
      tipoObjeto.lstObjetos?.forEach((objeto) => objetos.push(objeto))
    )
  );

  return objetos;
}

export const sessionSlice = createSlice({
  name: 'session',
  initialState: initialState,
  reducers: {
    loginRequest: (state, action: PayloadAction<LoginRequest>) => {
      state.error = undefined;
      state.loading = true;
    },
    loginSuccess: (state, action: PayloadAction<UserLogin>) => {
      state.user = action.payload;
      state.objetos = getObjetos(action.payload.lstSistemas);
      state.authenticated = true;

      const jsonUser = JSON.stringify(action.payload);
      global.window.localStorage.setItem('dm_pr_relatorios_user', jsonUser);
      state.error = undefined;
      state.loading = false;
    },
    loginError: (state, action: PayloadAction<ErrorAPI>) => {
      state.error = action.payload;
      state.loading = false;
    },
    logout: (state) => {
      state.user = null;
      state.authenticated = false;
      state.error = undefined;
      state.loading = false;

      global.window.localStorage.removeItem('dm_pr_relatorios_user');
    },
  },
});

export const { loginRequest, loginSuccess, loginError, logout } = sessionSlice.actions;

export default sessionSlice.reducer;
