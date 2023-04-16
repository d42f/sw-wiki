import { Action, configureStore, combineReducers, ThunkAction, Middleware, isRejectedWithValue } from '@reduxjs/toolkit';
import { apiSlice } from './apiSlice';

export const errorHandlerMiddleware: Middleware = () => next => action => {
  if (isRejectedWithValue(action)) {
    console.error(action.payload);
  }
  return next(action);
};

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware, errorHandlerMiddleware),
});

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action<string>>;
