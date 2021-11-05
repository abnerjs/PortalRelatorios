import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Paginacao } from 'src/store/ducks/base';
import { RespostaApi, TipoFiltro } from 'src/store/ducks/base/types';
import {
  UsuarioFornecedor,
  UsuariosFornecedoresState,
} from 'src/store/ducks/usuariosFornecedores/types';

const initialState: UsuariosFornecedoresState = {
  data: [],
  filterList: [],
  pagination: Paginacao.getValoresPadrao(),
  error: undefined,
  loading: false,
  operationError: undefined,
  operationState: 'idle',
  deleteError: undefined,
  deleteState: 'idle',
};

export const usuariosFornecedoresSlice = createSlice({
  name: 'usuariosFornecedores',
  initialState: initialState,
  reducers: {
    usuariosFornecedoresGetRequest: (
      state,
      action: PayloadAction<string | undefined>
    ) => {
      state.loading = true;
      state.error = undefined;
    },
    usuariosFornecedoresGetSuccess: (
      state,
      action: PayloadAction<RespostaApi<UsuarioFornecedor>>
    ) => {
      state.data = action.payload.dados;
      state.pagination = action.payload.paginacao;
      state.error = undefined;
      state.loading = false;
    },
    usuariosFornecedoresGetError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    usuariosFornecedoresGetFilterRequest: (
      state,
      action: PayloadAction<string | undefined>
    ) => {},
    usuariosFornecedoresGetFilterSuccess: (
      state,
      action: PayloadAction<RespostaApi<TipoFiltro>>
    ) => {
      state.filterList = action.payload.dados;
    },
    usuariosFornecedoresPostRequest: (
      state,
      action: PayloadAction<UsuarioFornecedor>
    ) => {
      state.operationState = 'request';
    },
    usuariosFornecedoresPutRequest: (
      state,
      action: PayloadAction<UsuarioFornecedor>
    ) => {
      state.operationState = 'request';
    },
    usuariosFornecedoresDeleteRequest: (
      state,
      action: PayloadAction<UsuarioFornecedor>
    ) => {
      state.operationState = 'request';
    },
    usuariosFornecedoresOperationSuccess: (state) => {
      state.operationError = undefined;
      state.operationState = 'success';
    },
    usuariosFornecedoresOperationError: (state, action: PayloadAction<string>) => {
      state.operationError = action.payload;
      state.operationState = 'error';
    },
    usuariosFornecedoresDeleteError: (state, action: PayloadAction<string>) => {
      state.deleteError = action.payload;
      state.deleteState = 'error';
    },
    usuariosFornecedoresDeleteSuccess: (state) => {
      state.deleteError = undefined;
      state.deleteState = 'success';
    },
  },
});

export const {
  usuariosFornecedoresGetRequest,
  usuariosFornecedoresGetSuccess,
  usuariosFornecedoresGetError,
  usuariosFornecedoresGetFilterRequest,
  usuariosFornecedoresGetFilterSuccess,
  usuariosFornecedoresPostRequest,
  usuariosFornecedoresPutRequest,
  usuariosFornecedoresDeleteRequest,
  usuariosFornecedoresOperationSuccess,
  usuariosFornecedoresOperationError,
  usuariosFornecedoresDeleteError,
  usuariosFornecedoresDeleteSuccess,
} = usuariosFornecedoresSlice.actions;

export default usuariosFornecedoresSlice.reducer;
