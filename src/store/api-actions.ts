import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '../types/state';
import { Card } from '../types/card';
import { APIRoute } from '../const';
import { AuthInfo } from '../types/auth-info';
import { UserData } from '../types/user-data';
import { saveToken, dropToken } from '../services/token';

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

export const loginAction = createAsyncThunk<UserData, AuthInfo, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
  rejectValue: string;
}>(
  'user/login',
  async({ email, password }, {extra: api, rejectWithValue}) => {
    try {
      const {data} = await api.post<UserData>(APIRoute.Login, {email, password});
      saveToken(data.token);
      return data;
    } catch {
      return rejectWithValue('Failed to login, try one more time');
    }
  }
);

export const checkAuthAction = createAsyncThunk<UserData, undefined, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
  rejectValue: string;
}>(
  'user/checkAuth',
  async (_arg, {extra: api, rejectWithValue}) => {
    try{
      const {data} = await api.get<UserData>(APIRoute.Login);
      return data;
    } catch {
      return rejectWithValue('Failed to check authorization');
    }
  }
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
  rejectValue: string;
}>(
  'user/logout',
  async (_arg, {extra: api, rejectWithValue}) => {
    try {
      await api.delete(APIRoute.Logout);
      dropToken();
    } catch {
      return rejectWithValue('Failded to logout, try one more time');
    }
  },
);
