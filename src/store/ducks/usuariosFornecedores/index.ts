import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Paginacao } from 'src/store/ducks/base';
import { RespostaApi, TipoFiltro } from 'src/store/ducks/base/types';
import {
  UsuarioFornecedor,
  UsuariosFornecedoresState,
} from 'src/store/ducks/usuariosFornecedores/types';

const initialState: UsuariosFornecedoresState = {
  data: [],
  filterList: [],
  pagination: Paginacao.getValoresPadrao(),
};

export const usuariosFornecedoresSlice = createSlice({
  name: 'usuariosFornecedores',
  initialState: initialState,
  reducers: {
    usuariosFornecedoresGetRequest: (
      state,
      action: PayloadAction<string | undefined>
    ) => {},
    usuariosFornecedoresGetSuccess: (
      state,
      action: PayloadAction<RespostaApi<UsuarioFornecedor>>
    ) => {
      state.data = action.payload.dados;
      state.pagination = action.payload.paginacao;
    },
    usuariosFornecedoresGetFilterRequest: (
      state,
      action: PayloadAction<string | undefined>
    ) => {},
    usuariosFornecedoresGetFilterSuccess: (
      state,
      action: PayloadAction<RespostaApi<TipoFiltro>>
    ) => {
      state.filterList = action.payload.dados;
    },
    usuariosFornecedoresPostRequest: (
      state,
      action: PayloadAction<UsuarioFornecedor>
    ) => {},
    usuariosFornecedoresPutRequest: (
      state,
      action: PayloadAction<UsuarioFornecedor>
    ) => {},
    usuariosFornecedoresDeleteRequest: (
      state,
      action: PayloadAction<UsuarioFornecedor>
    ) => {},
  },
});

export const {
  usuariosFornecedoresGetRequest,
  usuariosFornecedoresGetSuccess,
  usuariosFornecedoresGetFilterRequest,
  usuariosFornecedoresGetFilterSuccess,
  usuariosFornecedoresPostRequest,
  usuariosFornecedoresPutRequest,
  usuariosFornecedoresDeleteRequest,
} = usuariosFornecedoresSlice.actions;

export default usuariosFornecedoresSlice.reducer;