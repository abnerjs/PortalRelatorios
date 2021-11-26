import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Paginacao } from '../base';
import { ArquivosState } from './types';

const initialState: ArquivosState = {
  data: undefined,
  filterList: [],
  pagination: Paginacao.getValoresPadrao(),
  error: undefined,
};

export const relatoriosSlice = createSlice({
  name: 'relatorios',
  initialState: initialState,
  reducers: {
    relatoriosDownloadRequest: (
      state,
      action: PayloadAction<{ url: string; query: string }>
    ) => {
      state.error = undefined;
    },
    relatoriosDownloadSuccess: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
      state.error = undefined;
    },
    relatoriosDownloadError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    relatoriosUploadRequest: (state) => {
      state.error = undefined;
    },
    relatoriosUploadSuccess: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
      state.error = undefined;
    },
    relatoriosUploadError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const {
  relatoriosDownloadRequest,
  relatoriosDownloadSuccess,
  relatoriosDownloadError,
} = relatoriosSlice.actions;

export default relatoriosSlice.reducer;
