import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Paginacao } from 'src/store/ducks/base';
import { RespostaApi, TipoFiltro } from 'src/store/ducks/base/types';
import { UsuarioFornecedor, UsuariosFornecedoresState } from 'src/store/ducks/usuariosFornecedores/types';
import { ErrorAPI } from '../types';

const initialState: UsuariosFornecedoresState = {
  data: [],
  filterList: [],
  pagination: Paginacao.getValoresPadrao(),
  error: undefined,
  loading: false,
  operationError: undefined,
  operationState: 'idle',
};

export const usuariosFornecedoresSlice = createSlice({
  name: 'usuariosFornecedores',
  initialState: initialState,
  reducers: {
    usuariosFornecedoresGetRequest: (state, action: PayloadAction<string | undefined>) => {
      state.loading = true;
      state.error = undefined;
    },
    usuariosFornecedoresGetSuccess: (state, action: PayloadAction<RespostaApi<UsuarioFornecedor>>) => {
      state.data = action.payload.dados;
      state.pagination = action.payload.paginacao;
      state.error = undefined;
      state.loading = false;
    },
    usuariosFornecedoresGetError: (state, action: PayloadAction<ErrorAPI>) => {
      state.error = action.payload;
    },
    usuariosFornecedoresGetFilterRequest: (state, action: PayloadAction<string | undefined>) => {},
    usuariosFornecedoresGetFilterSuccess: (state, action: PayloadAction<RespostaApi<TipoFiltro>>) => {
      state.filterList = action.payload.dados;
    },
    usuariosFornecedoresPutRequest: (state, action: PayloadAction<UsuarioFornecedor>) => {
      state.operationState = 'request';
    },
    usuariosFornecedoresOperationSuccess: (state) => {
      state.operationError = undefined;
      state.operationState = 'success';
    },
    usuariosFornecedoresOperationError: (state, action: PayloadAction<ErrorAPI>) => {
      state.operationError = action.payload;
      state.operationState = 'error';
    },
    usuariosFornecedoresIdleOperation: (state) => {
      state.operationError = undefined;
      state.operationState = 'idle';
    },
  },
});

export const {
  usuariosFornecedoresGetRequest,
  usuariosFornecedoresGetSuccess,
  usuariosFornecedoresGetError,
  usuariosFornecedoresGetFilterRequest,
  usuariosFornecedoresGetFilterSuccess,
  usuariosFornecedoresPutRequest,
  usuariosFornecedoresOperationSuccess,
  usuariosFornecedoresOperationError,
  usuariosFornecedoresIdleOperation,
} = usuariosFornecedoresSlice.actions;

export default usuariosFornecedoresSlice.reducer;
