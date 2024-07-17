import type { Action, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { AppState } from '@/store';

export const isHydrateAction = (
  action: Action
): action is PayloadAction<AppState> => action.type === HYDRATE;
