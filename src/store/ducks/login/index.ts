import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Objeto, Sistema, UserLogin, SessionState, LoginRequest, RecoveryRequest } from 'src/store/ducks/login/types';
import { ErrorAPI } from '../types';

const jsonUser = global.window.localStorage.getItem('dm_pr_relatorios_user');
const user = (jsonUser ? JSON.parse(jsonUser) : null) as UserLogin;

const initialState: SessionState = {
  user: user,
  objetos: getObjetos(user?.lstSistemas ?? []),
  authenticated: user !== null,
  error: undefined,
  message: undefined,
  operationState: 'idle',
  loading: false,
};

function getObjetos(lstSistemas: Array<Sistema>): Array<Objeto> {
  const objetos: Array<Objeto> = [];

  lstSistemas?.forEach((sistema) =>
    sistema.lstTiposObjetos?.forEach((tipoObjeto) => tipoObjeto.lstObjetos?.forEach((objeto) => objetos.push(objeto)))
  );

  return objetos;
}

export const sessionSlice = createSlice({
  name: 'session',
  initialState: initialState,
  reducers: {
    loginRequest: (state, action: PayloadAction<LoginRequest>) => {
      state.error = undefined;
      state.message = undefined;
      state.operationState = 'request';
    },
    loginSuccess: (state, action: PayloadAction<UserLogin>) => {
      state.user = action.payload;
      state.objetos = getObjetos(action.payload.lstSistemas);
      state.authenticated = true;

      state.error = undefined;
      state.message = undefined;
      state.operationState = 'success';

      const jsonUser = JSON.stringify(action.payload);
      global.window.localStorage.setItem('dm_pr_relatorios_user', jsonUser);
    },
    loginError: (state, action: PayloadAction<ErrorAPI>) => {
      state.error = action.payload;
      state.message = undefined;
      state.operationState = 'error';
    },
    changeFlgTrocaSenha: (state) =>  {
      state.user!.flgTrocaSenha = 'N';
    },
    changeFlgPrimeiroAcesso: (state) =>  {
      state.user!.flgPrimeiroAcesso = 'N';
    },
    recoveryRequest: (state, action: PayloadAction<RecoveryRequest>) => {
      state.error = undefined;
      state.message = undefined;
      state.operationState = 'request';
    },
    recoverySuccess: (state, action: PayloadAction<string>) => {
      state.error = undefined;
      state.message = action.payload;
      state.operationState = 'success';
    },
    recoveryError: (state, action: PayloadAction<ErrorAPI>) => {
      state.error = action.payload;
      state.message = undefined;
      state.operationState = 'error';
    },
    logout: (state) => {
      state.user = null;
      state.authenticated = false;
      state.error = undefined;
      state.message = undefined;
      state.operationState = 'idle';

      global.window.localStorage.removeItem('dm_pr_relatorios_user');
    },
    reset: (state) => {
      state.error = undefined;
      state.message = undefined;
      state.operationState = 'idle';
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginError,
  changeFlgPrimeiroAcesso,
  changeFlgTrocaSenha,
  recoveryRequest,
  recoverySuccess,
  recoveryError,
  logout,
  reset,
} = sessionSlice.actions;

export default sessionSlice.reducer;
