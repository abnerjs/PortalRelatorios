import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { RespostaApi, TipoFiltro } from 'src/store/ducks/base/types';
import { TiposRecursosState } from 'src/store/ducks/tiposRecursos/types';

const initialState: TiposRecursosState = {
  filterList: [],
  error: undefined,
};

export const tiposRecursosSlice = createSlice({
  name: 'tiposRecursos',
  initialState: initialState,
  reducers: {
    tiposRecursosGetFilterRequest: (
      state,
      action: PayloadAction<string | undefined>
    ) => {
      state.error = undefined;
    },
    tiposRecursosGetFilterSuccess: (
      state,
      action: PayloadAction<RespostaApi<TipoFiltro>>
    ) => {
      state.filterList = action.payload.dados;
      state.error = undefined;
    },
    tiposRecursosGetFilterError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const { tiposRecursosGetFilterRequest, tiposRecursosGetFilterSuccess, tiposRecursosGetFilterError } =
  tiposRecursosSlice.actions;

export default tiposRecursosSlice.reducer;
