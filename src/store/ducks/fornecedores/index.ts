import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { RespostaApi, TipoFiltro } from 'src/store/ducks/base/types';
import { FornecedoresState } from 'src/store/ducks/fornecedores/types';

const initialState: FornecedoresState = {
  filterList: [],
};

export const fornecedoresSlice = createSlice({
  name: 'fornecedores',
  initialState: initialState,
  reducers: {
    fornecedoresGetFilterRequest: (
      state,
      action: PayloadAction<string | undefined>
    ) => {},
    fornecedoresGetFilterSuccess: (
      state,
      action: PayloadAction<RespostaApi<TipoFiltro>>
    ) => {
      state.filterList = action.payload.dados;
    },
  },
});

export const { fornecedoresGetFilterRequest, fornecedoresGetFilterSuccess } =
  fornecedoresSlice.actions;

export default fornecedoresSlice.reducer;
