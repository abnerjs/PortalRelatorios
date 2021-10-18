import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { ObjetosState } from 'src/store/ducks/objetos/types';
import { RespostaApi, TipoFiltro } from 'src/store/ducks/base/types';

const initialState: ObjetosState = {
  filterList: [],
};

export const objetosSlice = createSlice({
  name: 'objetos',
  initialState: initialState,
  reducers: {
    objetosGetFilterRequest: (
      state,
      action: PayloadAction<string | undefined>
    ) => {},
    objetosGetFilterSuccess: (
      state,
      action: PayloadAction<RespostaApi<TipoFiltro>>
    ) => {
      state.filterList = action.payload.dados;
    },
  },
});

export const { objetosGetFilterRequest, objetosGetFilterSuccess } =
  objetosSlice.actions;

export default objetosSlice.reducer;
