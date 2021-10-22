import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { RespostaApi, TipoFiltro } from 'src/store/ducks/base/types';
import { PrestadoresState } from 'src/store/ducks/prestadores/types';

const initialState: PrestadoresState = {
  filterList: [],
};

export const prestadoresSlice = createSlice({
  name: 'prestadores',
  initialState: initialState,
  reducers: {
    prestadoresGetFilterRequest: (
      state,
      action: PayloadAction<string | undefined>
    ) => {},
    prestadoresGetFilterSuccess: (
      state,
      action: PayloadAction<RespostaApi<TipoFiltro>>
    ) => {
      state.filterList = action.payload.dados;
    },
  },
});

export const { prestadoresGetFilterRequest, prestadoresGetFilterSuccess } =
  prestadoresSlice.actions;

export default prestadoresSlice.reducer;
