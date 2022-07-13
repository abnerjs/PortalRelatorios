import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Paginacao } from 'src/store/ducks/base';
import { RespostaApi, TipoFiltro } from 'src/store/ducks/base/types';
import { UsuarioPrestador, UsuariosPrestadoresState } from 'src/store/ducks/usuariosPrestadores/types';
import { ErrorAPI } from '../types';

const initialState: UsuariosPrestadoresState = {
  data: [],
  filterList: [],
  pagination: Paginacao.getValoresPadrao(),
  error: undefined,
  loading: false,
  operationError: undefined,
  operationState: 'idle',
};

export const usuariosPrestadoresSlice = createSlice({
  name: 'usuariosPrestadores',
  initialState: initialState,
  reducers: {
    usuariosPrestadoresGetRequest: (state, action: PayloadAction<string | undefined>) => {
      state.loading = true;
      state.error = undefined;
    },
    usuariosPrestadoresGetSuccess: (state, action: PayloadAction<RespostaApi<UsuarioPrestador>>) => {
      state.data = action.payload.dados;
      state.pagination = action.payload.paginacao;
      state.error = undefined;
      state.loading = false;
    },
    usuariosPrestadoresGetError: (state, action: PayloadAction<ErrorAPI>) => {
      state.error = action.payload;
    },
    usuariosPrestadoresGetFilterRequest: (state, action: PayloadAction<string | undefined>) => {},
    usuariosPrestadoresGetFilterSuccess: (state, action: PayloadAction<RespostaApi<TipoFiltro>>) => {
      state.filterList = action.payload.dados;
    },
    usuariosPrestadoresPutRequest: (state, action: PayloadAction<UsuarioPrestador>) => {
      state.operationState = 'request';
    },
    usuariosPrestadoresOperationSuccess: (state) => {
      state.operationError = undefined;
      state.operationState = 'success';
    },
    usuariosPrestadoresOperationError: (state, action: PayloadAction<ErrorAPI>) => {
      state.operationError = action.payload;
      state.operationState = 'error';
    },
    usuariosPrestadoresIdleOperation: (state) => {
      state.operationError = undefined;
      state.operationState = 'idle';
    },
  },
});

export const {
  usuariosPrestadoresGetRequest,
  usuariosPrestadoresGetSuccess,
  usuariosPrestadoresGetError,
  usuariosPrestadoresGetFilterRequest,
  usuariosPrestadoresGetFilterSuccess,
  usuariosPrestadoresPutRequest,
  usuariosPrestadoresOperationSuccess,
  usuariosPrestadoresOperationError,
  usuariosPrestadoresIdleOperation,
} = usuariosPrestadoresSlice.actions;

export default usuariosPrestadoresSlice.reducer;
