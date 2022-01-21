import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { FiltrosRelatorios } from 'src/pages/Relatorios/Gerenciamento';
import { Paginacao } from '../base';
import { RespostaApi } from '../base/types';
import { ErrorAPI } from '../types';
import {
  ArquivosByTipo,
  ArquivosState,
  ArquivoUpdate,
  ArquivoUpload,
  ArquivoUploadReceiveFormat,
} from './types';

const initialState: ArquivosState = {
  data: [],
  file: undefined,
  filterList: [],
  pagination: Paginacao.getValoresPadrao(),
  error: undefined,
  state: undefined,
  downloadError: [],
  uploadError: undefined,
  uploadState: undefined, // undef- idle; s- success; e- error; l-loading
  deleteError: undefined,
  deleteState: undefined, // undef- idle; s- success; e- error; l-loading
  fileRequestState: undefined,
  fileRequestError: undefined,
};

export const arquivoUploadSlice = createSlice({
  name: 'arquivos',
  initialState: initialState,
  reducers: {
    arquivosGetRequest: (
      state,
      action: PayloadAction<FiltrosRelatorios | undefined>
    ) => {
      state.error = undefined;
      state.state = 'l';
      state.downloadError = [];
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
    arquivosDownloadRequest: (state, action: PayloadAction<Array<number>>) => {
      state.downloadError.forEach((item, index) => {
        if (
          item?.table === action.payload[1] &&
          item?.line === action.payload[2]
        ) {
          state.downloadError.splice(index, 1);
          return;
        }
      });
    },
    arquivosDownloadSuccess: (state, action: PayloadAction<[any, number, number]>) => {
      state.file = action.payload[0];
      state.downloadError.forEach((item, index) => {
        if (
          item?.table === action.payload[1] &&
          item?.line === action.payload[2]
        ) {
          state.downloadError.splice(index, 1);
          return;
        }
      });
    },
    arquivosDownloadError: (
      state,
      action: PayloadAction<[ErrorAPI, number, number]>
    ) => {
      if (state.downloadError && state.downloadError.length === 0 && state.downloadError) {
        state.downloadError = [
          {
            error: action.payload[0],
            table: action.payload[1],
            line: action.payload[2],
          },
        ];
      } else {
        state.downloadError = state.downloadError.map((item, index) => {
          if (
            item?.table === action.payload[1] &&
            item?.line === action.payload[2]
          ) {
            return {
              error: action.payload[0],
              table: action.payload[1],
              line: action.payload[2],
            };
          } else {
            return state.downloadError[index];
          }
        });
      }
    },
    arquivosDownloadIdle: (state) => {
      state.file = undefined;
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
    arquivosUpdateRequest: (state, action: PayloadAction<ArquivoUpdate>) => {
      state.uploadError = undefined;
      state.uploadState = 'l';
    },
    arquivosUpdateSuccess: (state) => {
      state.uploadError = undefined;
      state.uploadState = 's';
    },
    arquivosUpdateError: (state, action: PayloadAction<ErrorAPI>) => {
      state.uploadError = action.payload;
      state.uploadState = 'e';
    },
    arquivosUpdateIdle: (state) => {
      state.uploadState = undefined;
      state.uploadError = undefined;
    },
    arquivosDeleteRequest: (
      state,
      action: PayloadAction<ArquivoUploadReceiveFormat>
    ) => {
      state.deleteError = undefined;
      state.deleteState = 'l';
    },
    arquivosDeleteSuccess: (state) => {
      state.deleteError = undefined;
      state.deleteState = 's';
    },
    arquivosDeleteError: (state, action: PayloadAction<ErrorAPI>) => {
      state.deleteError = action.payload;
      state.deleteState = 'e';
    },
    arquivosDeleteIdle: (state) => {
      state.uploadState = undefined;
      state.deleteState = undefined;
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
  arquivosDownloadIdle,
  arquivosUploadRequest,
  arquivosUploadSuccess,
  arquivosUploadError,
  arquivosUploadIdle,
  arquivosUpdateRequest,
  arquivosUpdateSuccess,
  arquivosUpdateError,
  arquivosUpdateIdle,
  arquivosDeleteRequest,
  arquivosDeleteSuccess,
  arquivosDeleteError,
  arquivosDeleteIdle,
} = arquivoUploadSlice.actions;

export default arquivoUploadSlice.reducer;
