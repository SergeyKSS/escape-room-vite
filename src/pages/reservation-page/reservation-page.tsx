import ReservationCard from './reservation-card';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect } from 'react';
import {
  fetchUserReservationAction,
  deleteUserReservationAction,
} from '../../store/api-actions';
import Spinner from '../../components/spinner/spinner';
import { processErrorHandle } from '../../services/process-error-handle';
import { Helmet } from 'react-helmet-async';

function ReservationPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const isReservationLoading = useAppSelector(
    (state) => state.reservation.isReservationLoading,
  );
  const userReservation = useAppSelector(
    (state) => state.reservation.reservationInfo,
  );
  const isReservationDeleting = useAppSelector(
    (state) => state.reservation.isReservationDeleting,
  );

  useEffect(() => {
    dispatch(fetchUserReservationAction()).then((result) => {
      if (fetchUserReservationAction.rejected.match(result)) {
        processErrorHandle(dispatch, result.payload ?? 'Unknown error');
      }
    });
  }, [dispatch]);

  if (isReservationLoading) {
    return <Spinner />;
  }

  const handleCancelClick = (reservationId: string) => {
    dispatch(deleteUserReservationAction(reservationId)).then((result) => {
      if (deleteUserReservationAction.rejected.match(result)) {
        processErrorHandle(dispatch, result.payload ?? 'Unknown error');
      }
    });
  };

  return (
    <main className="page-content decorated-page">
      <Helmet><title>Reservation page</title></Helmet>
      <div className="decorated-page__decor" aria-hidden="true">
        <picture>
          <source
            type="image/webp"
            srcSet="img/content/maniac/maniac-bg-size-m.webp, img/content/maniac/maniac-bg-size-m@2x.webp 2x"
          />
          <img
            src="img/content/maniac/maniac-bg-size-m.jpg"
            srcSet="img/content/maniac/maniac-bg-size-m@2x.jpg 2x"
            width={1366}
            height={1959}
            alt=""
          />
        </picture>
      </div>
      <div className="container">
        <div className="page-content__title-wrapper">
          <h1 className="title title--size-m page-content__title">
            Мои бронирования
          </h1>
        </div>
        {userReservation.length === 0 ? (
          <p>У Вас пока нет бронирований</p>
        ) : (
          <div className="cards-grid">
            {userReservation.map((card) => (
              <ReservationCard
                key={card.id}
                card={card}
                onCancelClick={() => handleCancelClick(card.id)}
                isDisabled={isReservationDeleting}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default ReservationPage;
