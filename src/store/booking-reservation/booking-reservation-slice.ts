import { createSlice } from '@reduxjs/toolkit';
import { fetchUserReservationAction, deleteUserReservationAction } from '../api-actions';
import { ResponseBooking } from '../../types/booking-data';

type ReservationState = {
  reservationInfo: ResponseBooking[];
  isReservationLoading: boolean;
  hasReservationError: boolean;
  isReservationDeleting: boolean;
};

const initialState: ReservationState = {
  reservationInfo: [],
  isReservationLoading: false,
  hasReservationError: false,
  isReservationDeleting: false,
};

const reservationInfoSlice = createSlice({
  name: 'reservationInfo',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchUserReservationAction.pending, (state) => {
        state.isReservationLoading = true;
        state.hasReservationError = false;
        state.reservationInfo = [];
      })
      .addCase(fetchUserReservationAction.fulfilled, (state, action) => {
        state.isReservationLoading = false;
        state.hasReservationError = false;
        state.reservationInfo = action.payload;
      })
      .addCase(fetchUserReservationAction.rejected, (state) => {
        state.isReservationLoading = false;
        state.hasReservationError = true;
        state.reservationInfo = [];
      })
      .addCase(deleteUserReservationAction.pending, (state) => {
        state.isReservationDeleting = true;
      })
      .addCase(deleteUserReservationAction.fulfilled, (state, action) => {
        state.isReservationDeleting = false;
        state.reservationInfo = state.reservationInfo.filter(
          (reservation) => reservation.id !== action.meta.arg
        );
      })
      .addCase(deleteUserReservationAction.rejected, (state) => {
        state.isReservationDeleting = false;
      });
  }
});

export const reservationInfoReducer = reservationInfoSlice.reducer;
