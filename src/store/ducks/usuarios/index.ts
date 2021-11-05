import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Paginacao } from 'src/store/ducks/base';
import { RespostaApi, TipoFiltro } from 'src/store/ducks/base/types';
import { Usuario, UsuariosState } from 'src/store/ducks/usuarios/types';

const initialState: UsuariosState = {
  data: [],
  filterList: [],
  pagination: Paginacao.getValoresPadrao(),
  loading: false,
  error: undefined,
  operationError: undefined,
  operationState: 'idle',
  deleteError: undefined,
  deleteState: 'idle',
};

export const usuariosSlice = createSlice({
  name: 'usuarios',
  initialState: initialState,
  reducers: {
    usuariosGetRequest: (
      state,
      action: PayloadAction<string | undefined>
    ) => {
      state.loading = true;
      state.error = undefined;
    },
    usuariosGetSuccess: (
      state,
      action: PayloadAction<RespostaApi<Usuario>>
    ) => {
      state.data = action.payload.dados;
      state.pagination = action.payload.paginacao;
      state.loading = false;
      state.error = undefined;
    },
    usuariosGetError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    usuariosGetFilterRequest: (
      state,
      action: PayloadAction<string | undefined>
    ) => {},
    usuariosGetFilterSuccess: (
      state,
      action: PayloadAction<RespostaApi<TipoFiltro>>
    ) => {
      state.filterList = action.payload.dados;
    },
    usuariosPostRequest: (state, action: PayloadAction<Usuario>) => {
      state.operationState = 'request';
    },
    usuariosPutRequest: (state, action: PayloadAction<Usuario>) => {
      state.operationState = 'request';
    },
    usuariosOperationSuccess: (state) => {
      state.operationError = undefined;
      state.operationState = 'success';
    },
    usuariosOperationError: (state, action: PayloadAction<string>) => {
      state.operationError = action.payload;
      state.operationState = 'error';
    },
    usuariosDeleteRequest: (state, action: PayloadAction<Usuario>) => {
      state.deleteState = 'request';
    },
    usuariosDeleteError: (state, action: PayloadAction<string>) => {
      state.deleteError = action.payload;
      state.deleteState = 'error';
    },
    usuariosDeleteSuccess: (state) => {
      state.deleteError = undefined;
      state.deleteState = 'success';
    },
    usuariosCancelOperation: (state) => {
      state.operationError = undefined;
      state.operationState = 'cancel';
    },
    usuariosCancelDelete: (state) => {
      state.operationError = undefined;
      state.operationState = 'cancel';
    },
  },
});

export const {
  usuariosGetRequest,
  usuariosGetSuccess,
  usuariosGetError,
  usuariosGetFilterRequest,
  usuariosGetFilterSuccess,
  usuariosPostRequest,
  usuariosPutRequest,
  usuariosDeleteRequest,
  usuariosOperationSuccess,
  usuariosOperationError,
  usuariosDeleteSuccess,
  usuariosDeleteError,
  usuariosCancelOperation,
  usuariosCancelDelete,
} = usuariosSlice.actions;

export default usuariosSlice.reducer;
