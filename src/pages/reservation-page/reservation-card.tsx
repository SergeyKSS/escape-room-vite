import { ResponseBooking } from '../../types/booking-data';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { DifficultyTitle } from '../../const';

type ReservationCardProps = {
  card: ResponseBooking;
  onCancelClick: () => void;
  isDisabled: boolean;
};

function ReservationCard({card, onCancelClick, isDisabled}: ReservationCardProps): JSX.Element {
  return (
    <div className="quest-card">
      <div className="quest-card__img">
        <picture>
          <source
            type="image/webp"
            srcSet={card.quest.previewImgWebp}
          />
          <img
            src={card.quest.previewImg}
            width={344}
            height={232}
            alt={`Квест ${card.quest.title}`}
          />
        </picture>
      </div>
      <div className="quest-card__content">
        <div className="quest-card__info-wrapper">
          <Link className="quest-card__link" to={AppRoute.Quest.replace(':id', card.quest.id)}>
            {card.quest.title}
          </Link>
          <span className="quest-card__info">
            {`[${card.date === 'today' ? 'сегодня' : 'завтра'}, ${card.time}. ${card.location.address}]`}
          </span>
        </div>
        <ul className="tags quest-card__tags">
          <li className="tags__item">
            <svg width={11} height={14} aria-hidden="true">
              <use xlinkHref="#icon-person" />
            </svg>
            {card.peopleCount}&nbsp;чел
          </li>
          <li className="tags__item">
            <svg width={14} height={14} aria-hidden="true">
              <use xlinkHref="#icon-level" />
            </svg>
            {DifficultyTitle[card.quest.level]}
          </li>
        </ul>
        <button
          className="btn btn--accent btn--secondary quest-card__btn"
          type="button"
          onClick={onCancelClick}
          disabled={isDisabled}
        >
          Отменить
        </button>
      </div>
    </div>
  );
}

export default ReservationCard;
