import { Card } from '../../../types/card';
import { DifficultyTitle, AppRoute } from '../../../const';
import { Link } from 'react-router-dom';

type QuestCardProps = {
  card: Card;
};

function QuestCard({card}: QuestCardProps): JSX.Element {
  return (
    <div className="quest-card">
      <div className="quest-card__img">
        <picture>
          <source
            type="image/webp"
            srcSet={card.previewImgWebp}
          />
          <img
            src={card.previewImg}
            width="344"
            height="232"
            alt={`Квест ${card.title.toLowerCase()}`}
          />
        </picture>
      </div>
      <div className="quest-card__content">
        <div className="quest-card__info-wrapper">
          <Link className="quest-card__link" to={AppRoute.Quest.replace(':id', card.id)}>
            {card.title}
          </Link>
        </div>
        <ul className="tags quest-card__tags">
          <li className="tags__item">
            <svg width="11" height="14" aria-hidden="true">
              <use xlinkHref="#icon-person"></use>
            </svg>
            {card.peopleMinMax[0]}&ndash;{card.peopleMinMax[1]}&nbsp;чел
          </li>
          <li className="tags__item">
            <svg width="14" height="14" aria-hidden="true">
              <use xlinkHref="#icon-level"></use>
            </svg>
            {DifficultyTitle[card.level]}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default QuestCard;
