import { DifficultyData } from '../../../const';

type DifficultyItemProps = {
  id: (typeof DifficultyData)[number]['id'];
  title: (typeof DifficultyData)[number]['title'];
  activeFilter: (typeof DifficultyData)[number]['id'];
  onFilterChange: (id: (typeof DifficultyData)[number]['id']) => void;
};

function DifficultyItem({
  id,
  title,
  activeFilter,
  onFilterChange,
}: DifficultyItemProps): JSX.Element {
  return (
    <li className="filter__item">
      <input
        type="radio"
        name="level"
        id={id}
        checked={activeFilter === id}
        onChange={() => onFilterChange(id)}
      />
      <label className="filter__label" htmlFor={id}>
        <span className="filter__label-text">{title}</span>
      </label>
    </li>
  );
}

export default DifficultyItem;
