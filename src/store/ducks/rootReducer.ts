import { combineReducers } from '@reduxjs/toolkit';

import { sessionSlice } from 'src/store/ducks/login';
import { objetosSlice } from 'src/store/ducks/objetos';
import { perfisSlice } from 'src/store/ducks/perfis';

const rootReducer = combineReducers({
  objetos: objetosSlice.reducer,
  perfis: perfisSlice.reducer,
  session: sessionSlice.reducer,
});

export default rootReducer;
