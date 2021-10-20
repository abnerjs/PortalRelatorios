import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { RespostaApi, TipoFiltro } from 'src/store/ducks/base/types';
import { TiposRecursosState } from 'src/store/ducks/tiposRecursos/types';

const initialState: TiposRecursosState = {
  filterList: [],
};

export const tiposRecursosSlice = createSlice({
  name: 'tiposRecursos',
  initialState: initialState,
  reducers: {
    tiposRecursosGetFilterRequest: (
      state,
      action: PayloadAction<string | undefined>
    ) => {},
    tiposRecursosGetFilterSuccess: (
      state,
      action: PayloadAction<RespostaApi<TipoFiltro>>
    ) => {
      state.filterList = action.payload.dados;
    },
  },
});

export const { tiposRecursosGetFilterRequest, tiposRecursosGetFilterSuccess } =
  tiposRecursosSlice.actions;

export default tiposRecursosSlice.reducer;
