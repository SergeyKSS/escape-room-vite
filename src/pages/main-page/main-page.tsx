import FilterTopic from './filter-topic/filter-topic';
import FilterDifficulty from './filter-difficulty/filter-difficulty';
import CardsGrid from './cards-grid/cards-grid';
import { useEffect } from 'react';
import { fetchQuestsAction } from '../../store/api-actions';
import { processErrorHandle } from '../../services/process-error-handle';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setDifficulty, setTopic } from '../../store/quests/quests-slice';
import { DifficultyId } from '../../types/difficulty';
import { TopicId } from '../../types/topic';
import { selectFilteredQuests } from '../../store/selectors';
import { Helmet } from 'react-helmet-async';

function MainPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const activeFilter = useAppSelector((state) => state.quests.questsTopic);
  const activeDifficulty = useAppSelector((state) => state.quests.questsDifficulty);

  const handleFilterChange = (id: TopicId) => dispatch(setTopic(id));
  const handleDifficultyChange = (id: DifficultyId) => dispatch(setDifficulty(id));
  const filteredQuests = useAppSelector(selectFilteredQuests);

  useEffect(() => {
    dispatch(fetchQuestsAction()).then((result) => {
      if (fetchQuestsAction.rejected.match(result)) {
        processErrorHandle(dispatch, result.payload ?? 'Unknown error');
      }
    });
  }, [dispatch]);

  return (
    <main className="page-content">
      <Helmet><title>Main page</title></Helmet>
      <div className="container">
        <div className="page-content__title-wrapper">
          <h1 className="subtitle page-content__subtitle">
            квесты в Санкт-Петербурге
          </h1>
          <h2 className="title title--size-m page-content__title">
            Выберите тематику
          </h2>
        </div>
        <div className="page-content__item">
          <form className="filter" action="#" method="get">
            <fieldset className="filter__section">
              <legend className="visually-hidden">Тематика</legend>
              <FilterTopic activeFilter={activeFilter} onFilterChange={handleFilterChange}/>
            </fieldset>
            <fieldset className="filter__section">
              <legend className="visually-hidden">Сложность</legend>
              <FilterDifficulty activeDifficulty={activeDifficulty} onDifficultyChange={handleDifficultyChange}/>
            </fieldset>
          </form>
        </div>
        <h2 className="title visually-hidden">Выберите квест</h2>
        <CardsGrid cards={filteredQuests}/>
      </div>
    </main>
  );
}

export default MainPage;
