import BookingDecore from './booking-decore';
import BookingHeader from './booking-header';
import { useParams, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchQuestByIdAction, fetchQuestBookingAction } from '../../store/api-actions';
import BookingMap from './booking-map';
import { AppRoute } from '../../const';
import Spinner from '../../components/spinner/spinner';

function BookingPage(): JSX.Element | null {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const quest = useAppSelector((state) => state.detailedQuest.quest);
  const bookingInfo = useAppSelector((state) => state.bookingInfo.bookingInfo);
  const [selectedPlaceId, setSelectedPlaceId] = useState('');
  const isQuestNotFound = useAppSelector((state) => state.bookingInfo.isBookingInfoNotFound);
  const isQuestLoading = useAppSelector((state) => state.detailedQuest.isQuestLoading);
  const isBookingInfoLoading = useAppSelector((state) => state.bookingInfo.isBookingInfoLoading);

  useEffect(() => {
    if (id) {
      dispatch(fetchQuestByIdAction(id));
      dispatch(fetchQuestBookingAction(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    setSelectedPlaceId('');
  }, [id]);

  useEffect(() => {
    if (bookingInfo.length > 0 && selectedPlaceId === '') {
      setSelectedPlaceId(bookingInfo[0].id);
    }
  }, [bookingInfo, selectedPlaceId]);

  if (!id || isQuestNotFound) {
    return <Navigate to={AppRoute.NotFound} replace />;
  }

  if (isQuestLoading || isBookingInfoLoading) {
    return <Spinner />;
  }

  const selectedPlace = bookingInfo.find(
    (place) => place.id === selectedPlaceId
  );

  if (!quest) {
    return null;
  }

  return (
    <main className="page-content decorated-page">
      <BookingDecore />

      <div className="container container--size-s">
        <BookingHeader title={quest.title} />
        <BookingMap
          places={bookingInfo}
          selectedPlaceId={selectedPlaceId}
          onPlaceSelect={setSelectedPlaceId}
          address={selectedPlace?.location.address ?? ''}
        />

        <form
          className="booking-form"
          action="https://echo.htmlacademy.ru/"
          method="post"
        >
          <fieldset className="booking-form__section">
            <legend className="visually-hidden">Выбор даты и времени</legend>
            <fieldset className="booking-form__date-section">
              <legend className="booking-form__date-title">Сегодня</legend>
              <div className="booking-form__date-inner-wrapper">
                <label className="custom-radio booking-form__date">
                  <input
                    type="radio"
                    id="today9h45m"
                    name="date"
                    required
                    defaultValue="today9h45m"
                  />
                  <span className="custom-radio__label">9:45</span>
                </label>
                <label className="custom-radio booking-form__date">
                  <input
                    type="radio"
                    id="today15h00m"
                    name="date"
                    defaultChecked
                    required
                    defaultValue="today15h00m"
                  />
                  <span className="custom-radio__label">15:00</span>
                </label>
                <label className="custom-radio booking-form__date">
                  <input
                    type="radio"
                    id="today17h30m"
                    name="date"
                    required
                    defaultValue="today17h30m"
                  />
                  <span className="custom-radio__label">17:30</span>
                </label>
                <label className="custom-radio booking-form__date">
                  <input
                    type="radio"
                    id="today19h30m"
                    name="date"
                    required
                    defaultValue="today19h30m"
                    disabled
                  />
                  <span className="custom-radio__label">19:30</span>
                </label>
                <label className="custom-radio booking-form__date">
                  <input
                    type="radio"
                    id="today21h30m"
                    name="date"
                    required
                    defaultValue="today21h30m"
                  />
                  <span className="custom-radio__label">21:30</span>
                </label>
              </div>
            </fieldset>
            <fieldset className="booking-form__date-section">
              <legend className="booking-form__date-title">Завтра</legend>
              <div className="booking-form__date-inner-wrapper">
                <label className="custom-radio booking-form__date">
                  <input
                    type="radio"
                    id="tomorrow11h00m"
                    name="date"
                    required
                    defaultValue="tomorrow11h00m"
                  />
                  <span className="custom-radio__label">11:00</span>
                </label>
                <label className="custom-radio booking-form__date">
                  <input
                    type="radio"
                    id="tomorrow15h00m"
                    name="date"
                    required
                    defaultValue="tomorrow15h00m"
                    disabled
                  />
                  <span className="custom-radio__label">15:00</span>
                </label>
                <label className="custom-radio booking-form__date">
                  <input
                    type="radio"
                    id="tomorrow17h30m"
                    name="date"
                    required
                    defaultValue="tomorrow17h30m"
                    disabled
                  />
                  <span className="custom-radio__label">17:30</span>
                </label>
                <label className="custom-radio booking-form__date">
                  <input
                    type="radio"
                    id="tomorrow19h45m"
                    name="date"
                    required
                    defaultValue="tomorrow19h45m"
                  />
                  <span className="custom-radio__label">19:45</span>
                </label>
                <label className="custom-radio booking-form__date">
                  <input
                    type="radio"
                    id="tomorrow21h30m"
                    name="date"
                    required
                    defaultValue="tomorrow21h30m"
                  />
                  <span className="custom-radio__label">21:30</span>
                </label>
              </div>
            </fieldset>
          </fieldset>
          <fieldset className="booking-form__section">
            <legend className="visually-hidden">Контактная информация</legend>
            <div className="custom-input booking-form__input">
              <label className="custom-input__label" htmlFor="name">
                Ваше имя
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Имя"
                required
                pattern="[А-Яа-яЁёA-Za-z'- ]{1,}"
              />
            </div>
            <div className="custom-input booking-form__input">
              <label className="custom-input__label" htmlFor="tel">
                Контактный телефон
              </label>
              <input
                type="tel"
                id="tel"
                name="tel"
                placeholder="Телефон"
                required
                pattern="[0-9]{10,}"
              />
            </div>
            <div className="custom-input booking-form__input">
              <label className="custom-input__label" htmlFor="person">
                Количество участников
              </label>
              <input
                type="number"
                id="person"
                name="person"
                placeholder="Количество участников"
                required
              />
            </div>
            <label className="custom-checkbox booking-form__checkbox booking-form__checkbox--children">
              <input
                type="checkbox"
                id="children"
                name="children"
                defaultChecked
              />
              <span className="custom-checkbox__icon">
                <svg width={20} height={17} aria-hidden="true">
                  <use xlinkHref="#icon-tick" />
                </svg>
              </span>
              <span className="custom-checkbox__label">
                Со&nbsp;мной будут дети
              </span>
            </label>
          </fieldset>
          <button
            className="btn btn--accent btn--cta booking-form__submit"
            type="submit"
          >
            Забронировать
          </button>
          <label className="custom-checkbox booking-form__checkbox booking-form__checkbox--agreement">
            <input
              type="checkbox"
              id="id-order-agreement"
              name="user-agreement"
              required
            />
            <span className="custom-checkbox__icon">
              <svg width={20} height={17} aria-hidden="true">
                <use xlinkHref="#icon-tick" />
              </svg>
            </span>
            <span className="custom-checkbox__label">
              Я&nbsp;согласен с
              <a className="link link--active-silver link--underlined" href="#">
                правилами обработки персональных данных
              </a>
              &nbsp;и пользовательским соглашением
            </span>
          </label>
        </form>
      </div>
    </main>
  );
}

export default BookingPage;
