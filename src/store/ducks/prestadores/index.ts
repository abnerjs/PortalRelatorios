import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { RespostaApi, TipoFiltro } from 'src/store/ducks/base/types';
import { PrestadoresState } from 'src/store/ducks/prestadores/types';
import { ErrorAPI } from '../types';

const initialState: PrestadoresState = {
  filterList: [],
  error: undefined,
};

export const prestadoresSlice = createSlice({
  name: 'prestadores',
  initialState: initialState,
  reducers: {
    prestadoresGetFilterRequest: (
      state,
      action: PayloadAction<string | undefined>
    ) => {
      state.error = undefined;
    },
    prestadoresGetFilterSuccess: (
      state,
      action: PayloadAction<RespostaApi<TipoFiltro>>
    ) => {
      state.filterList = action.payload.dados;
      state.error = undefined;
    },
    prestadoresGetFilterError: (state, action: PayloadAction<ErrorAPI>) => {
      state.error = action.payload;
    },
  },
});

export const {
  prestadoresGetFilterRequest,
  prestadoresGetFilterSuccess,
  prestadoresGetFilterError,
} = prestadoresSlice.actions;

export default prestadoresSlice.reducer;
