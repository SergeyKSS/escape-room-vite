import DifficultyItem from './difficulty-item';
import { DifficultyData } from '../../const';
import { useState } from 'react';

type DifficultyId = (typeof DifficultyData)[number]['id'];

function FilterDifficulty(): JSX.Element {
  const [activeFilter, setActiveFilter] = useState<DifficultyId>('any');

  return (
    <ul className="filter__list">
      {DifficultyData.map((item) => (
        <DifficultyItem
          key={item.id}
          id={item.id}
          title={item.title}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
      ))}
    </ul>
  );
}

export default FilterDifficulty;
