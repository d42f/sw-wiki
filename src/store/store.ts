import {
  Action,
  configureStore,
  combineReducers,
  ThunkAction,
  Middleware,
  isRejectedWithValue,
} from '@reduxjs/toolkit';
import { apiSlice } from './apiSlice';
import { createWrapper } from 'next-redux-wrapper';

export const errorHandlerMiddleware: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    console.error(action.payload);
  }
  return next(action);
};

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
});

export const makeStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        apiSlice.middleware,
        errorHandlerMiddleware
      ),
  });

export type AppStore = ReturnType<typeof makeStore>;

export type AppState = ReturnType<AppStore['getState']>;

export type AppDispatch = AppStore['dispatch'];

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export const wrapper = createWrapper<AppStore>(makeStore, { debug: false });
