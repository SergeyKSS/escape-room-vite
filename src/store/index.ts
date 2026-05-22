import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { createAPI } from '../services/api';
import { questsReducer } from './quests/quests-slice';
import { errorReducer } from './error/error-slice';
import { userReducer } from './user/user-slice';
import { detailedQuestReducer } from './detailed-quest/detailed-quest-slice';
import { bookingInfoSliceReducer } from './booking-info/booking-info-slice';
import { reservationInfoReducer } from './booking-reservation/booking-reservation';

export const rootReducer = combineReducers({
  quests: questsReducer,
  error: errorReducer,
  user: userReducer,
  detailedQuest: detailedQuestReducer,
  bookingInfo: bookingInfoSliceReducer,
  reservation: reservationInfoReducer,
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

