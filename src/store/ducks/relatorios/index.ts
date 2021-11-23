import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { RelatoriosState } from 'src/store/ducks/relatorios/types';

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
    relatoriosDownloadRequest: (
      state,
      action: PayloadAction<{ url: string; query: string }>
    ) => {
      state.error = undefined;
      state.loading = true;
    },
    relatoriosDownloadSuccess: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
      state.error = undefined;
      state.loading = false;
    },
    relatoriosDownloadError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { relatoriosDownloadRequest, relatoriosDownloadSuccess, relatoriosDownloadError } =
  relatoriosSlice.actions;

export default relatoriosSlice.reducer;
