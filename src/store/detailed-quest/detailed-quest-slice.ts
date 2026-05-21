import { DetailedQuest } from '../../types/detailed-quest';
import { createSlice } from '@reduxjs/toolkit';
import { fetchQuestByIdAction } from '../api-actions';

type QuestState = {
  quest: DetailedQuest | null;
  isQuestLoading: boolean;
  isQuestNotFound: boolean;
};

const initialState: QuestState = {
  quest: null,
  isQuestLoading: false,
  isQuestNotFound: false,
};

const questSlice = createSlice({
  name: 'detailedQuest',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestByIdAction.pending, (state) => {
        state.isQuestLoading = true;
        state.isQuestNotFound = false;
        state.quest = null;
      })
      .addCase(fetchQuestByIdAction.fulfilled, (state, action) => {
        state.isQuestLoading = false;
        state.quest = action.payload;
      })
      .addCase(fetchQuestByIdAction.rejected, (state) => {
        state.isQuestLoading = false;
        state.isQuestNotFound = true;
        state.quest = null;
      });
  },
});

export const detailedQuestReducer = questSlice.reducer;
