import { FilterData } from '../../../const';

type FilterItemProps = {
  id: (typeof FilterData)[number]['id'];
  width: string;
  height: string;
  href: (typeof FilterData)[number]['href'];
  title: (typeof FilterData)[number]['title'];
  activeFilter: (typeof FilterData)[number]['id'];
  onFilterChange: (id: (typeof FilterData)[number]['id']) => void;
};

function TopicItem({
  id,
  width,
  height,
  href,
  title,
  activeFilter,
  onFilterChange,
}: FilterItemProps): JSX.Element {
  return (
    <li className="filter__item">
      <input
        type="radio"
        name="type"
        id={id}
        checked={activeFilter === id}
        onChange={() => onFilterChange(id)}
      />
      <label className="filter__label" htmlFor={id}>
        <svg
          className="filter__icon"
          width={width} height={height}
          aria-hidden="true"
        >
          <use xlinkHref={href}></use>
        </svg>
        <span className="filter__label-text">{title}</span>
      </label>
    </li>
  );
}

export default TopicItem;
