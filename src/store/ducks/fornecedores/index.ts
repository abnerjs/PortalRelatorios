import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { RespostaApi, TipoFiltro } from 'src/store/ducks/base/types';
import { FornecedoresState } from 'src/store/ducks/fornecedores/types';

const initialState: FornecedoresState = {
  filterList: [],
  error: undefined,
};

export const fornecedoresSlice = createSlice({
  name: 'fornecedores',
  initialState: initialState,
  reducers: {
    fornecedoresGetFilterRequest: (
      state,
      action: PayloadAction<string | undefined>
    ) => {
      state.error = undefined;
    },
    fornecedoresGetFilterSuccess: (
      state,
      action: PayloadAction<RespostaApi<TipoFiltro>>
    ) => {
      state.filterList = action.payload.dados;
      state.error = undefined;
    },
    fornecedoresGetFilterError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const { fornecedoresGetFilterRequest, fornecedoresGetFilterSuccess, fornecedoresGetFilterError } =
  fornecedoresSlice.actions;

export default fornecedoresSlice.reducer;
