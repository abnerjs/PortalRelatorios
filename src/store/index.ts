import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import rootReducer from 'src/store/ducks/rootReducer';

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();

export default store;
