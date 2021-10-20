import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { RelatoriosState } from 'src/store/ducks/relatorios/types';

const initialState: RelatoriosState = {
  data: undefined,
};

export const relatoriosSlice = createSlice({
  name: 'relatorios',
  initialState: initialState,
  reducers: {
    relatoriosDownloadRequest: (
      state,
      action: PayloadAction<{ url: string; query: string }>
    ) => {},
    relatoriosDownloadSuccess: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
    },
  },
});

export const { relatoriosDownloadRequest, relatoriosDownloadSuccess } =
  relatoriosSlice.actions;

export default relatoriosSlice.reducer;
