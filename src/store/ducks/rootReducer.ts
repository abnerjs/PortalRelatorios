import { combineReducers } from '@reduxjs/toolkit';

import { sessionSlice } from 'src/store/ducks/login';

const rootReducer = combineReducers({
  session: sessionSlice.reducer,
});

export default rootReducer;
