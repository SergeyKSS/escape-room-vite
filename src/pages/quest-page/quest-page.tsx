import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchQuestByIdAction } from '../../store/api-actions';
import { useParams, Navigate, Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import Spinner from '../../components/spinner/spinner';
import { QuestTypeTitle } from '../../const';
import { DifficultyTitle } from '../../const';


function QuestPage(): JSX.Element | null {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const isQuestNotFound = useAppSelector((state) => state.detailedQuest.isQuestNotFound);
  const isQuestLoading = useAppSelector((state) => state.detailedQuest.isQuestLoading);
  const quest = useAppSelector((state) => state.detailedQuest.quest);

  useEffect(() => {
    if (id) {
      dispatch(fetchQuestByIdAction(id));
    }
  }, [id, dispatch]);

  if (!id || isQuestNotFound) {
    return <Navigate to={AppRoute.NotFound} replace />;
  }

  if (isQuestLoading) {
    return <Spinner />;
  }

  if (!quest) {
    return null;
  }

  return (
    <main className="decorated-page quest-page">
      <div className="decorated-page__decor" aria-hidden="true">
        <picture>
          <source
            type="image/webp"
            srcSet={quest.coverImgWebp}
          />
          <img
            src={quest.coverImg}
            width="1366"
            height="768"
            alt=""
          />
        </picture>
      </div>
      <div className="container container--size-l">
        <div className="quest-page__content">
          <h1 className="title title--size-l title--uppercase quest-page__title">
            {quest.title}
          </h1>
          <p className="subtitle quest-page__subtitle">
            <span className="visually-hidden">Жанр:</span>{QuestTypeTitle[quest.type]}
          </p>
          <ul className="tags tags--size-l quest-page__tags">
            <li className="tags__item">
              <svg width="11" height="14" aria-hidden="true">
                <use xlinkHref="#icon-person"></use>
              </svg>
              {quest.peopleMinMax[0]}&ndash;{quest.peopleMinMax[1]}&nbsp;чел
            </li>
            <li className="tags__item">
              <svg width="14" height="14" aria-hidden="true">
                <use xlinkHref="#icon-level"></use>
              </svg>
              {DifficultyTitle[quest.level]}
            </li>
          </ul>
          <p className="quest-page__description">
            {quest.description}
          </p>
          <Link
            className="btn btn--accent btn--cta quest-page__btn"
            to={AppRoute.Booking.replace(':id', quest.id)}
          >
            Забронировать
          </Link>
        </div>
      </div>
    </main>
  );
}

export default QuestPage;
