import { Card } from '../../types/card';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchQuestsAction } from '../api-actions';
import { DifficultyData, FilterData } from '../../const';

type QuestsState = {
  questsList: Card[];
  isQuestsLoading: boolean;
  questsTopic: (typeof FilterData)[number]['id'];
  questsDifficulty: (typeof DifficultyData)[number]['id'];
};

const initialState: QuestsState = {
  questsList: [],
  isQuestsLoading: false,
  questsTopic: 'all',
  questsDifficulty: 'any',
};

const questSlice = createSlice({
  name: 'quests',
  initialState,
  reducers: {
    setTopic(state, action: PayloadAction<(typeof FilterData)[number]['id']>) {
      state.questsTopic = action.payload;
    },
    setDifficulty(state, action: PayloadAction<(typeof DifficultyData)[number]['id']>) {
      state.questsDifficulty = action.payload;
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestsAction.pending, (state) => {
        state.isQuestsLoading = true;
      })
      .addCase(fetchQuestsAction.fulfilled, (state, action) => {
        state.questsList = action.payload;
        state.isQuestsLoading = false;
      })
      .addCase(fetchQuestsAction.rejected, (state) => {
        state.isQuestsLoading = false;
      });
  },
});

export const { setTopic, setDifficulty } = questSlice.actions;
export const questsReducer = questSlice.reducer;
