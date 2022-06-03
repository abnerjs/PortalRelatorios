import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { RelatoriosState } from 'src/store/ducks/relatorios/types';
import { ErrorAPI } from '../types';

const initialState: RelatoriosState = {
  data: undefined,
  error: undefined,
  loading: false,
  operationError: undefined,
  operationState: 'idle',
};

export const relatoriosSlice = createSlice({
  name: 'relatorios',
  initialState: initialState,
  reducers: {
    relatoriosDownloadRequest: (state, action: PayloadAction<{ url: string; query: string }>) => {
      state.error = undefined;
      state.loading = true;
    },
    relatoriosDownloadSuccess: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
      state.error = undefined;
      state.loading = false;
    },
    relatoriosDownloadError: (state, action: PayloadAction<ErrorAPI>) => {
      state.error = action.payload;
      state.loading = false;
    },
    relatoriosDownloadIdle: (state) => {
      state.error = undefined;
      state.loading = false;
    },
  },
});

export const { relatoriosDownloadRequest, relatoriosDownloadSuccess, relatoriosDownloadError, relatoriosDownloadIdle } =
  relatoriosSlice.actions;

export default relatoriosSlice.reducer;
