import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { createAPI } from '../services/api';
import { questsReducer } from './quests/quests-slice';
import { errorReducer } from './error/error.slice';

export const rootReducer = combineReducers({
  quests: questsReducer,
  error: errorReducer,
});

export const api = createAPI();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api
      }
    })
});

