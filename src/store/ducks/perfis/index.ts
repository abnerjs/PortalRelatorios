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
    perfisPostRequest: (state, action: PayloadAction<Perfil>) => {},
    perfisPutRequest: (state, action: PayloadAction<Perfil>) => {},
    perfisDeleteRequest: (state, action: PayloadAction<Perfil>) => {},
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
} = perfisSlice.actions;

export default perfisSlice.reducer;
