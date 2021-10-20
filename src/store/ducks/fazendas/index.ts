import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { RespostaApi, TipoFiltro } from 'src/store/ducks/base/types';
import { FazendasState } from 'src/store/ducks/fazendas/types';

const initialState: FazendasState = {
  filterList: [],
};

export const fazendasSlice = createSlice({
  name: 'fazendas',
  initialState: initialState,
  reducers: {
    fazendasGetFilterRequest: (
      state,
      action: PayloadAction<string | undefined>
    ) => {},
    fazendasGetFilterSuccess: (
      state,
      action: PayloadAction<RespostaApi<TipoFiltro>>
    ) => {
      state.filterList = action.payload.dados;
    },
  },
});

export const { fazendasGetFilterRequest, fazendasGetFilterSuccess } =
  fazendasSlice.actions;

export default fazendasSlice.reducer;
