import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../types/state';

export const selectFilteredQuests = createSelector(
  [
    (state: RootState) => state.quests.questsList,
    (state: RootState) => state.quests.questsTopic,
    (state: RootState) => state.quests.questsDifficulty,
  ],
  (quests, questTopic, difficultyFilter) =>
    quests.filter((quest) => {
      const isTopicMatched =
        questTopic === 'all' || quest.type === questTopic;

      const isDifficultyMatched =
        difficultyFilter === 'any' || quest.level === difficultyFilter;

      return isTopicMatched && isDifficultyMatched;
    })
);
