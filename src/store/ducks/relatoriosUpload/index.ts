import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Paginacao } from '../base';
import { RespostaApi } from '../base/types';
import { ArquivosByTipo, ArquivosState, ArquivoUpload } from './types';

const initialState: ArquivosState = {
  data: [],
  filterList: [],
  pagination: Paginacao.getValoresPadrao(),
  error: undefined,
  state: undefined,
  downloadError: undefined,
  uploadState: undefined, // undef- idle; s- success; e- error; l-loading
};

export const arquivoUploadSlice = createSlice({
  name: 'relatorios',
  initialState: initialState,
  reducers: {
    arquivosGetRequest: (
      state,
      action: PayloadAction<string | undefined>
    ) => {
      state.error = undefined;
      state.state = 'l';
    },
    arquivosGetSuccess: (
      state,
      action: PayloadAction<RespostaApi<ArquivosByTipo>>
    ) => {
      state.data = action.payload.dados;
      state.error = undefined;
      state.state = 's';
    },
    arquivosGetError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.state = 'e';
    },
    relatoriosDownloadRequest: (
      state,
      action: PayloadAction<{ url: string; query: string }>
    ) => {
      state.downloadError = undefined;
    },
    relatoriosDownloadSuccess: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
      state.downloadError = undefined;
    },
    relatoriosDownloadError: (state, action: PayloadAction<string>) => {
      state.downloadError = action.payload;
    },
    relatoriosUploadRequest: (state, action: PayloadAction<ArquivoUpload>) => {
      state.error = undefined;
      state.uploadState = 'l';
    },
    relatoriosUploadSuccess: (state) => {
      state.error = undefined;
      state.uploadState = 's';
    },
    relatoriosUploadError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.uploadState = 'e';
    },
    relatoriosUploadIdle: (state) => {
      state.uploadState = undefined;
      state.error = undefined;
    },
  },
});

export const {
  arquivosGetRequest,
  arquivosGetSuccess,
  arquivosGetError,
  relatoriosDownloadRequest,
  relatoriosDownloadSuccess,
  relatoriosDownloadError,
  relatoriosUploadRequest,
  relatoriosUploadSuccess,
  relatoriosUploadError,
} = arquivoUploadSlice.actions;

export default arquivoUploadSlice.reducer;
