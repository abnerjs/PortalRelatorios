import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Paginacao } from 'src/store/ducks/base';
import { RespostaApi, TipoFiltro } from 'src/store/ducks/base/types';
import { Perfil, PerfisState } from 'src/store/ducks/perfis/types';

const initialState: PerfisState = {
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

export const perfisSlice = createSlice({
  name: 'perfis',
  initialState: initialState,
  reducers: {
    perfisGetRequest: (state, action: PayloadAction<string | undefined>) => {
      state.loading = true;
      state.error = undefined;
    },
    perfisGetSuccess: (state, action: PayloadAction<RespostaApi<Perfil>>) => {
      state.data = action.payload.dados;
      state.pagination = action.payload.paginacao;
      state.loading = false;
      state.error = undefined;
    },
    perfisGetError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    perfisGetFilterRequest: (
      state,
      action: PayloadAction<string | undefined>
    ) => {},
    perfisGetFilterSuccess: (
      state,
      action: PayloadAction<RespostaApi<TipoFiltro>>
    ) => {
      state.filterList = action.payload.dados;
    },
    perfisPostRequest: (state, action: PayloadAction<Perfil>) => {
      state.operationState = 'request';
    },
    perfisPutRequest: (state, action: PayloadAction<Perfil>) => {
      state.operationState = 'request';
    },    
    perfisOperationSuccess: (state) => {
      state.operationError = undefined;
      state.operationState = 'success';
    },
    perfisOperationError: (state, action: PayloadAction<string>) => {
      state.operationError = action.payload;
      state.operationState = 'error';
    },
    perfisDeleteRequest: (state, action: PayloadAction<Perfil>) => {
      state.deleteState = 'request';
    },
    perfisDeleteError: (state, action: PayloadAction<string>) => {
      state.deleteError = action.payload;
      state.deleteState = 'error';
    },
    perfisDeleteSuccess: (state) => {
      state.deleteError = undefined;
      state.deleteState = 'success';
    },
  },
});

export const {
  perfisGetRequest,
  perfisGetSuccess,
  perfisGetError,
  perfisGetFilterRequest,
  perfisGetFilterSuccess,
  perfisPostRequest,
  perfisPutRequest,
  perfisDeleteRequest,
  perfisOperationSuccess,
  perfisOperationError,
  perfisDeleteSuccess,
  perfisDeleteError,
} = perfisSlice.actions;

export default perfisSlice.reducer;
