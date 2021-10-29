import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { RespostaApi, TipoFiltro } from 'src/store/ducks/base/types';
import { FazendasState } from 'src/store/ducks/fazendas/types';

const initialState: FazendasState = {
  filterList: [],
  error: undefined,
};

export const fazendasSlice = createSlice({
  name: 'fazendas',
  initialState: initialState,
  reducers: {
    fazendasGetFilterRequest: (
      state,
      action: PayloadAction<string | undefined>
    ) => {
      state.error = undefined;
    },
    fazendasGetFilterSuccess: (
      state,
      action: PayloadAction<RespostaApi<TipoFiltro>>
    ) => {
      state.filterList = action.payload.dados;
      state.error = undefined;
    },
    fazendasGetFilterError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const { fazendasGetFilterRequest, fazendasGetFilterSuccess, fazendasGetFilterError } =
  fazendasSlice.actions;

export default fazendasSlice.reducer;
