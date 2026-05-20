import TopicItem from './topic-item';
import { FilterData } from '../../../const';

type FilterTopicProps = {
  activeFilter: (typeof FilterData)[number]['id'];
  onFilterChange: (id: (typeof FilterData)[number]['id']) => void;
}

function FilterTopic({activeFilter, onFilterChange}: FilterTopicProps): JSX.Element {
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
          onFilterChange={onFilterChange}
        />
      ))}
    </ul>
  );
}

export default FilterTopic;
