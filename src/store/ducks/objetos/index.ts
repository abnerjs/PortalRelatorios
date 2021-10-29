import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { ObjetosState } from 'src/store/ducks/objetos/types';
import { RespostaApi, TipoFiltro } from 'src/store/ducks/base/types';

const initialState: ObjetosState = {
  filterList: [],
  error: undefined,
};

export const objetosSlice = createSlice({
  name: 'objetos',
  initialState: initialState,
  reducers: {
    objetosGetFilterRequest: (
      state,
      action: PayloadAction<string | undefined>
    ) => {
      state.error = undefined;
    },
    objetosGetFilterSuccess: (
      state,
      action: PayloadAction<RespostaApi<TipoFiltro>>
    ) => {
      state.filterList = action.payload.dados;
      state.error = undefined;
    },
    objetosGetFilterError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const { objetosGetFilterRequest, objetosGetFilterSuccess, objetosGetFilterError } =
  objetosSlice.actions;

export default objetosSlice.reducer;
