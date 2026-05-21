import { createSlice } from '@reduxjs/toolkit';
import { fetchQuestBookingAction } from '../api-actions';
import { Booking } from '../../types/booking';

type BookingInfoState = {
  bookingInfo: Booking[];
  isBookingInfoLoading: boolean;
  isBookingInfoNotFound: boolean;
};

const initialState: BookingInfoState = {
  bookingInfo: [],
  isBookingInfoLoading: false,
  isBookingInfoNotFound: false,
};

const bookingInfoSlice = createSlice({
  name: 'bookingInfo',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestBookingAction.pending, (state) => {
        state.isBookingInfoLoading = true;
        state.isBookingInfoNotFound = false;
        state.bookingInfo = [];
      })
      .addCase(fetchQuestBookingAction.fulfilled, (state, action) => {
        state.isBookingInfoLoading = false;
        state.bookingInfo = action.payload;
        state.isBookingInfoNotFound = false;
      })
      .addCase(fetchQuestBookingAction.rejected, (state) => {
        state.isBookingInfoLoading = false;
        state.isBookingInfoNotFound = true;
        state.bookingInfo = [];
      });
  },
});

export const bookingInfoSliceReducer = bookingInfoSlice.reducer;
