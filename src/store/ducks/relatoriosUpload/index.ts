import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Paginacao } from '../base';
import { RespostaApi } from '../base/types';
import { ErrorAPI } from '../types';
import { ArquivosByTipo, ArquivosState, ArquivoUpload } from './types';

const initialState: ArquivosState = {
  data: [],
  file: undefined,
  filterList: [],
  pagination: Paginacao.getValoresPadrao(),
  error: undefined,
  uploadError: undefined,
  state: undefined,
  downloadError: undefined,
  uploadState: undefined, // undef- idle; s- success; e- error; l-loading
};

export const arquivoUploadSlice = createSlice({
  name: 'arquivos',
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
    arquivosGetError: (state, action: PayloadAction<ErrorAPI>) => {
      state.error = action.payload;
      state.state = 'e';
    },
    arquivosDownloadRequest: (
      state,
      action: PayloadAction<number>
    ) => {
      state.downloadError = undefined;
    },
    arquivosDownloadSuccess: (state, action: PayloadAction<any>) => {
      state.file = action.payload;
      state.downloadError = undefined;
    },
    arquivosDownloadError: (state, action: PayloadAction<ErrorAPI>) => {
      state.downloadError = action.payload;
    },
    arquivosDownloadIdle: (state) => {
      state.file = undefined;
      state.downloadError = undefined;
    },
    arquivosUploadRequest: (state, action: PayloadAction<ArquivoUpload>) => {
      state.uploadError = undefined;
      state.uploadState = 'l';
    },
    arquivosUploadSuccess: (state) => {
      state.uploadError = undefined;
      state.uploadState = 's';
    },
    arquivosUploadError: (state, action: PayloadAction<ErrorAPI>) => {
      state.uploadError = action.payload;
      state.uploadState = 'e';
    },
    arquivosUploadIdle: (state) => {
      state.uploadState = undefined;
      state.uploadError = undefined;
    },
  },
});

export const {
  arquivosGetRequest,
  arquivosGetSuccess,
  arquivosGetError,
  arquivosDownloadRequest,
  arquivosDownloadSuccess,
  arquivosDownloadError,
  arquivosUploadRequest,
  arquivosUploadSuccess,
  arquivosUploadError,
  arquivosUploadIdle,
} = arquivoUploadSlice.actions;

export default arquivoUploadSlice.reducer;
