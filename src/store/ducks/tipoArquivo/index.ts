import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Paginacao } from 'src/store/ducks/base';
import { RespostaApi, TipoFiltro } from 'src/store/ducks/base/types';
import { TipoArquivo, TipoArquivoState } from 'src/store/ducks/tipoArquivo/types';

const initialState: TipoArquivoState = {
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

export const tipoArquivoSlice = createSlice({
  name: 'tipoArquivo',
  initialState: initialState,
  reducers: {
    tipoArquivoGetRequest: (state, action: PayloadAction<string | undefined>) => {
      state.loading = true;
      state.error = undefined;
    },
    tipoArquivoGetSuccess: (state, action: PayloadAction<RespostaApi<TipoArquivo>>) => {
      state.data = action.payload.dados;
      state.pagination = action.payload.paginacao;
      state.loading = false;
      state.error = undefined;
    },
    tipoArquivoGetError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    tipoArquivoCleanError: (state) => {
      state.error = undefined;
    },
    tipoArquivoGetFilterRequest: (
      state,
      action: PayloadAction<string | undefined>
    ) => {},
    tipoArquivoGetFilterSuccess: (
      state,
      action: PayloadAction<RespostaApi<TipoFiltro>>
    ) => {
      state.filterList = action.payload.dados;
    },
    tipoArquivoPostRequest: (state, action: PayloadAction<TipoArquivo>) => {
      state.operationState = 'request';
    },
    tipoArquivoPutRequest: (state, action: PayloadAction<TipoArquivo>) => {
      state.operationState = 'request';
    },    
    tipoArquivoOperationSuccess: (state) => {
      state.operationError = undefined;
      state.operationState = 'success';
    },
    tipoArquivoOperationError: (state, action: PayloadAction<string>) => {
      state.operationError = action.payload;
      state.operationState = 'error';
    },
    tipoArquivoDeleteRequest: (state, action: PayloadAction<TipoArquivo>) => {
      state.deleteState = 'request';
    },
    tipoArquivoDeleteError: (state, action: PayloadAction<string>) => {
      state.deleteError = action.payload;
      state.deleteState = 'error';
    },
    tipoArquivoDeleteSuccess: (state) => {
      state.deleteError = undefined;
      state.deleteState = 'success';
    },
    tipoArquivoCancelOperation: (state) => {
      state.operationError = undefined;
      state.operationState = 'cancel';
    },
    tipoArquivoCancelDelete: (state) => {
      state.deleteError = undefined;
      state.deleteState = 'cancel';
    },
    tipoArquivoIdleOperation: (state) => {
      state.operationError = undefined;
      state.operationState = 'idle';
    },
    tipoArquivoIdleDelete: (state) => {
      state.deleteError = undefined;
      state.deleteState = 'idle';
    },
  },
});

export const {
  tipoArquivoGetRequest,
  tipoArquivoGetSuccess,
  tipoArquivoGetError,
  tipoArquivoGetFilterRequest,
  tipoArquivoGetFilterSuccess,
  tipoArquivoPostRequest,
  tipoArquivoPutRequest,
  tipoArquivoDeleteRequest,
  tipoArquivoOperationSuccess,
  tipoArquivoOperationError,
  tipoArquivoDeleteSuccess,
  tipoArquivoDeleteError,
  tipoArquivoCancelOperation,
  tipoArquivoCancelDelete,
  tipoArquivoIdleOperation,
  tipoArquivoIdleDelete,
  tipoArquivoCleanError,
} = tipoArquivoSlice.actions;

export default tipoArquivoSlice.reducer;
