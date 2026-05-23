import BookingDecore from './booking-decore';
import BookingHeader from './booking-header';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchQuestByIdAction,fetchQuestBookingAction } from '../../store/api-actions';
import BookingMap from './booking-map';
import { AppRoute } from '../../const';
import Spinner from '../../components/spinner/spinner';
import BookingForm from './booking-form/booking-form';
import { SubmitHandler, useForm } from 'react-hook-form';
import { BookingFormData } from '../../types/booking-data';
import { postQuestBookingAction } from '../../store/api-actions';
import { dayValue, formatSlotId } from '../../utils/utils';
import { processErrorHandle } from '../../services/process-error-handle';
import { Helmet } from 'react-helmet-async';

function BookingPage(): JSX.Element | null {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const quest = useAppSelector((state) => state.detailedQuest.quest);
  const bookingInfo = useAppSelector((state) => state.bookingInfo.bookingInfo);
  const [selectedPlaceId, setSelectedPlaceId] = useState('');
  const navigate = useNavigate();
  const isBookingInfoNotFound = useAppSelector(
    (state) => state.bookingInfo.isBookingInfoNotFound,
  );
  const isDetailedQuestNotFound = useAppSelector(
    (state) => state.detailedQuest.isQuestNotFound,
  );
  const isQuestLoading = useAppSelector(
    (state) => state.detailedQuest.isQuestLoading,
  );
  const isBookingInfoLoading = useAppSelector(
    (state) => state.bookingInfo.isBookingInfoLoading,
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingFormData>({
    mode: 'onChange',
    defaultValues: {
      withChildren: true,
    },
  });

  useEffect(() => {
    if (id) {
      dispatch(fetchQuestByIdAction(id));
      dispatch(fetchQuestBookingAction(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    setSelectedPlaceId('');
  }, [id]);

  if (!id || isBookingInfoNotFound || isDetailedQuestNotFound) {
    return <Navigate to={AppRoute.NotFound} replace />;
  }

  if (isQuestLoading || isBookingInfoLoading) {
    return <Spinner />;
  }

  const selectedPlaceIdOrFirst = selectedPlaceId || bookingInfo[0]?.id || '';

  const selectedPlace = bookingInfo.find(
    (place) => place.id === selectedPlaceIdOrFirst,
  );

  const getSelectedSlot = (slotId: string) => {
    if (!selectedPlace) {
      return null;
    }

    const todaySlot = selectedPlace.slots.today.find(
      (slot) => `${dayValue.Сегодня}${formatSlotId(slot.time)}` === slotId,
    );

    if (todaySlot) {
      return {
        date: 'today' as const,
        time: todaySlot.time,
      };
    }

    const tomorrowSlot = selectedPlace.slots.tomorrow.find(
      (slot) => `${dayValue.Завтра}${formatSlotId(slot.time)}` === slotId,
    );

    if (tomorrowSlot) {
      return {
        date: 'tomorrow' as const,
        time: tomorrowSlot.time,
      };
    }
    return null;
  };

  const onSubmit: SubmitHandler<BookingFormData> = (data) => {
    if (!id || !selectedPlace) {
      return;
    }

    const selectedSlot = getSelectedSlot(data.slotId);
    if (!selectedSlot) {
      return;
    }

    dispatch(
      postQuestBookingAction({
        questId: id,
        bookingData: {
          date: selectedSlot.date,
          time: selectedSlot.time,
          contactPerson: data.contactPerson,
          phone: data.phone,
          peopleCount: data.peopleCount,
          withChildren: data.withChildren,
          placeId: selectedPlace.id,
        },
      }),
    ).then((result) => {
      if (postQuestBookingAction.fulfilled.match(result)) {
        navigate(AppRoute.MyQuests);
      }

      if (postQuestBookingAction.rejected.match(result)) {
        processErrorHandle(dispatch, result.payload ?? 'Unknown error');
      }
    });
  };

  if (!quest) {
    return null;
  }

  return (
    <main className="page-content decorated-page">
      <Helmet><title>Booking page</title></Helmet>
      <BookingDecore />

      <div className="container container--size-s">
        <BookingHeader title={quest.title} />

        {bookingInfo.length > 0 && (
          <BookingMap
            places={bookingInfo}
            selectedPlaceId={selectedPlaceIdOrFirst}
            onPlaceSelect={setSelectedPlaceId}
            address={selectedPlace?.location.address ?? ''}
          />
        )}

        <BookingForm
          todaySlots={selectedPlace?.slots.today ?? []}
          tomorrowSlots={selectedPlace?.slots.tomorrow ?? []}
          register={register}
          errors={errors}
          onSubmit={(evt) => {
            void handleSubmit(onSubmit)(evt);
          }}
          minPeople={quest.peopleMinMax[0]}
          maxPeople={quest.peopleMinMax[1]}
        />
      </div>
    </main>
  );
}

export default BookingPage;
