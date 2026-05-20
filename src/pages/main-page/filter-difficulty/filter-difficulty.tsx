import DifficultyItem from './difficulty-item';
import { DifficultyData } from '../../../const';

type DifficultyId = (typeof DifficultyData)[number]['id'];

type FilterDifficultyProps = {
  activeDifficulty: DifficultyId;
  onDifficultyChange: (id: DifficultyId) => void;
};

function FilterDifficulty({activeDifficulty, onDifficultyChange}: FilterDifficultyProps): JSX.Element {

  return (
    <ul className="filter__list">
      {DifficultyData.map((item) => (
        <DifficultyItem
          key={item.id}
          id={item.id}
          title={item.title}
          activeFilter={activeDifficulty}
          onFilterChange={onDifficultyChange}
        />
      ))}
    </ul>
  );
}

export default FilterDifficulty;
