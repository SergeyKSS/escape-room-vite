import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '../types/state';
import { Card } from '../types/card';
import { APIRoute } from '../const';
// import { saveToken, dropToken } from '../services/token';

export const fetchQuestsAction = createAsyncThunk<Card[], undefined, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
  rejectValue: string;
}>(
  'fetchCards',
  async (_arg, { extra: api, rejectWithValue}) => {
    try {
      const {data} = await api.get<Card[]>(APIRoute.Quests);
      return data;
    } catch {
      return rejectWithValue('Failed to fetch quests from server');
    }
  }
);
