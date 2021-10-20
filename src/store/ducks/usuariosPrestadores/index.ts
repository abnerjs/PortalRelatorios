import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Paginacao } from 'src/store/ducks/base';
import { RespostaApi, TipoFiltro } from 'src/store/ducks/base/types';
import {
  UsuarioPrestador,
  UsuariosPrestadoresState,
} from 'src/store/ducks/usuariosPrestadores/types';

const initialState: UsuariosPrestadoresState = {
  data: [],
  filterList: [],
  pagination: Paginacao.getValoresPadrao(),
};

export const usuariosPrestadoresSlice = createSlice({
  name: 'usuariosPrestadores',
  initialState: initialState,
  reducers: {
    usuariosPrestadoresGetRequest: (
      state,
      action: PayloadAction<string | undefined>
    ) => {},
    usuariosPrestadoresGetSuccess: (
      state,
      action: PayloadAction<RespostaApi<UsuarioPrestador>>
    ) => {
      state.data = action.payload.dados;
      state.pagination = action.payload.paginacao;
    },
    usuariosPrestadoresGetFilterRequest: (
      state,
      action: PayloadAction<string | undefined>
    ) => {},
    usuariosPrestadoresGetFilterSuccess: (
      state,
      action: PayloadAction<RespostaApi<TipoFiltro>>
    ) => {
      state.filterList = action.payload.dados;
    },
    usuariosPrestadoresPostRequest: (
      state,
      action: PayloadAction<UsuarioPrestador>
    ) => {},
    usuariosPrestadoresPutRequest: (
      state,
      action: PayloadAction<UsuarioPrestador>
    ) => {},
    usuariosPrestadoresDeleteRequest: (
      state,
      action: PayloadAction<UsuarioPrestador>
    ) => {},
  },
});

export const {
  usuariosPrestadoresGetRequest,
  usuariosPrestadoresGetSuccess,
  usuariosPrestadoresGetFilterRequest,
  usuariosPrestadoresGetFilterSuccess,
  usuariosPrestadoresPostRequest,
  usuariosPrestadoresPutRequest,
  usuariosPrestadoresDeleteRequest,
} = usuariosPrestadoresSlice.actions;

export default usuariosPrestadoresSlice.reducer;
