import FormDateSection from './form-date-section';
import { Slot } from '../../../types/form-slot';
import FormContacts from './form-contacts';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { BookingFormData } from '../../../types/booking-data';

type BookingFormProps = {
  todaySlots: Slot[];
  tomorrowSlots: Slot[];
  register: UseFormRegister<BookingFormData>;
  errors: FieldErrors<BookingFormData>;
  onSubmit: (evt: React.FormEvent<HTMLFormElement>) => void;
  minPeople: number;
  maxPeople: number;
};

function BookingForm({
  todaySlots,
  tomorrowSlots,
  register,
  errors,
  onSubmit,
  minPeople,
  maxPeople,
}: BookingFormProps): JSX.Element {
  return (
    <form
      className="booking-form"
      onSubmit={onSubmit}
    >
      <fieldset className="booking-form__section">
        <legend className="visually-hidden">Выбор даты и времени</legend>

        <FormDateSection
          slots={todaySlots}
          day={'Сегодня'}
          register={register}
        />

        <FormDateSection
          slots={tomorrowSlots}
          day={'Завтра'}
          register={register}
        />
        {errors.slotId && <span>{errors.slotId.message}</span>}
      </fieldset>

      <FormContacts
        register={register}
        errors={errors}
        minPeople={minPeople}
        maxPeople={maxPeople}
      />
    </form>
  );
}

export default BookingForm;
