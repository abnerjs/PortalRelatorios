import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Paginacao } from 'src/store/ducks/base';
import { RespostaApi, TipoFiltro } from 'src/store/ducks/base/types';
import { ChangePasswordFromRecoveryRequest, ChangeUsuarioPasswordRequest, Usuario, UsuariosState } from 'src/store/ducks/usuarios/types';
import { ErrorAPI } from '../types';

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
  changePasswordError: undefined,
  changePasswordState: 'idle',
  changePasswordFromRequestError: undefined,
  changePasswordFromRequestState: 'idle',
};

export const usuariosSlice = createSlice({
  name: 'usuarios',
  initialState: initialState,
  reducers: {
    usuariosGetRequest: (state, action: PayloadAction<string | undefined>) => {
      state.loading = true;
      state.error = undefined;
    },
    usuariosGetSuccess: (state, action: PayloadAction<RespostaApi<Usuario>>) => {
      state.data = action.payload.dados;
      state.pagination = action.payload.paginacao;
      state.loading = false;
      state.error = undefined;
    },
    usuariosGetError: (state, action: PayloadAction<ErrorAPI>) => {
      state.error = action.payload;
      state.loading = false;
    },
    usuariosCleanError: (state) => {
      state.error = undefined;
    },
    usuariosGetFilterRequest: (state, action: PayloadAction<string | undefined>) => {
      state.error = undefined;
    },
    usuariosGetFilterSuccess: (state, action: PayloadAction<RespostaApi<TipoFiltro>>) => {
      state.filterList = action.payload.dados;
    },
    usuariosGetFilterError: (state, action: PayloadAction<ErrorAPI>) => {
      state.error = action.payload;
    },
    usuariosPostRequest: (state, action: PayloadAction<Usuario>) => {
      state.operationState = 'request';
    },
    usuariosPutRequest: (state, action: PayloadAction<Usuario>) => {
      state.operationState = 'request';
    },
    usuariosChangeFlagActiveRequest: (state, action: PayloadAction<Usuario>) => {
      state.operationState = 'request';
    },
    usuariosOperationSuccess: (state) => {
      state.operationError = undefined;
      state.operationState = 'success';
    },
    usuariosOperationError: (state, action: PayloadAction<ErrorAPI>) => {
      state.operationError = action.payload;
      state.operationState = 'error';
    },
    usuariosDeleteRequest: (state, action: PayloadAction<Usuario>) => {
      state.deleteState = 'request';
    },
    usuariosDeleteError: (state, action: PayloadAction<ErrorAPI>) => {
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
      state.deleteError = undefined;
      state.deleteState = 'cancel';
    },
    usuariosIdleOperation: (state) => {
      state.operationError = undefined;
      state.operationState = 'idle';
    },
    usuariosIdleDelete: (state) => {
      state.deleteError = undefined;
      state.deleteState = 'idle';
    },
    changeUsuarioPasswordRequest: (state, action: PayloadAction<ChangeUsuarioPasswordRequest>) => {
      state.changePasswordState = 'request';
    },
    changeUsuarioPasswordSuccess: (state) => {
      state.changePasswordError = undefined;
      state.changePasswordState = 'success';
    },
    changeUsuarioPasswordError: (state, action: PayloadAction<ErrorAPI>) => {
      state.changePasswordError = action.payload;
      state.changePasswordState = 'error';
    },
    changeUsuarioPasswordIdle: (state) => {
      state.changePasswordError = undefined;
      state.changePasswordState = 'idle';
    },
    changeUsuarioPasswordCancel: (state) => {
      state.changePasswordError = undefined;
      state.changePasswordState = 'cancel';
    },
    changePasswordFromRecoveryRequest: (state, action: PayloadAction<ChangePasswordFromRecoveryRequest>) => {
      state.changePasswordFromRequestState = 'request';
    },
    changePasswordFromRecoverySuccess: (state) => {
      state.changePasswordFromRequestError = undefined;
      state.changePasswordFromRequestState = 'success';
    },
    changePasswordFromRecoveryError: (state, action: PayloadAction<ErrorAPI>) => {
      state.changePasswordFromRequestError = action.payload;
      state.changePasswordFromRequestState = 'error';
    },
    changePasswordFromRecoveryIdle: (state) => {
      state.changePasswordFromRequestError = undefined;
      state.changePasswordFromRequestState = 'idle';
    },
    changePasswordFromRecoveryCancel: (state) => {
      state.changePasswordFromRequestError = undefined;
      state.changePasswordFromRequestState = 'cancel';
    },
    changePasswordFromAdminRequest: (state, action: PayloadAction<{IdRelUsuario: number}>) => {
      state.changePasswordFromRequestState = 'request';
    },
    changePasswordFromAdminSuccess: (state) => {
      state.changePasswordFromRequestError = undefined;
      state.changePasswordFromRequestState = 'success';
    },
    changePasswordFromAdminError: (state, action: PayloadAction<ErrorAPI>) => {
      state.changePasswordFromRequestError = action.payload;
      state.changePasswordFromRequestState = 'error';
    },
    changePasswordFromAdminIdle: (state) => {
      state.changePasswordFromRequestError = undefined;
      state.changePasswordFromRequestState = 'idle';
    },
    changePasswordFromAdminCancel: (state) => {
      state.changePasswordFromRequestError = undefined;
      state.changePasswordFromRequestState = 'cancel';
    },
  },
});

export const {
  usuariosGetRequest,
  usuariosGetSuccess,
  usuariosGetError,
  usuariosGetFilterRequest,
  usuariosGetFilterSuccess,
  usuariosGetFilterError,
  usuariosPostRequest,
  usuariosPutRequest,
  usuariosChangeFlagActiveRequest,
  usuariosDeleteRequest,
  usuariosOperationSuccess,
  usuariosOperationError,
  usuariosDeleteSuccess,
  usuariosDeleteError,
  usuariosCancelOperation,
  usuariosCancelDelete,
  usuariosIdleOperation,
  usuariosIdleDelete,
  usuariosCleanError,
  changeUsuarioPasswordRequest,
  changeUsuarioPasswordSuccess,
  changeUsuarioPasswordError,
  changeUsuarioPasswordIdle,
  changeUsuarioPasswordCancel,
  changePasswordFromRecoveryRequest,
  changePasswordFromRecoverySuccess,
  changePasswordFromRecoveryError,
  changePasswordFromRecoveryIdle,
  changePasswordFromRecoveryCancel,
  changePasswordFromAdminRequest,
  changePasswordFromAdminSuccess,
  changePasswordFromAdminError,
  changePasswordFromAdminIdle,
  changePasswordFromAdminCancel,
} = usuariosSlice.actions;

export default usuariosSlice.reducer;
