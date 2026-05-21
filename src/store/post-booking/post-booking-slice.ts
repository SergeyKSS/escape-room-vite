import { createSlice } from '@reduxjs/toolkit';
import { postQuestBookingAction } from '../api-actions';
import { ResponseBooking } from '../../types/booking-data';

type ResponseBookingState = {
  responseInfo: ResponseBooking | null;
  isPostQuestLoading: boolean;
  isResponseInfoNotFound: boolean;
};

const initialState: ResponseBookingState = {
  responseInfo: null,
  isPostQuestLoading: false,
  isResponseInfoNotFound: false,
};

const postBookingSlice = createSlice({
  name: 'responseInfo',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(postQuestBookingAction.pending, (state) => {
        state.isPostQuestLoading = true;
        state.isResponseInfoNotFound = false;
        state.responseInfo = null;
      })
      .addCase(postQuestBookingAction.fulfilled, (state, action) => {
        state.isPostQuestLoading = false;
        state.isResponseInfoNotFound = false;
        state.responseInfo = action.payload;
      })
      .addCase(postQuestBookingAction.rejected, (state) => {
        state.isPostQuestLoading = false;
        state.isResponseInfoNotFound = true;
        state.responseInfo = null;
      });
  },
});

export const postBookingSliceReducer = postBookingSlice.reducer;
