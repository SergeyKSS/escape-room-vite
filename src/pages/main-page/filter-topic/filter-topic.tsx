import TopicItem from './topic-item';
import { FilterData } from '../../../const';
import { useState } from 'react';

type FilterId = (typeof FilterData)[number]['id'];

function FilterTopic(): JSX.Element {
  const [activeFilter, setActiveFilter] = useState<FilterId>('all');

  return (
    <ul className="filter__list">
      {FilterData.map((item) => (
        <TopicItem
          key={item.id}
          id={item.id}
          width={item.width}
          height={item.height}
          href={item.href}
          title={item.title}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
      ))}
    </ul>
  );
}

export default FilterTopic;
