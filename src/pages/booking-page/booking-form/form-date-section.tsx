import FormSlot from './form-slot';
import { dayValue, formatSlotId } from '../../../utils/utils';
import { Slot } from '../../../types/form-slot';
import { BookingFormData } from '../../../types/booking-data';
import { UseFormRegister } from 'react-hook-form';

type FormDateSectionProps = {
  slots: Slot[];
  day: 'Сегодня' | 'Завтра';
  register: UseFormRegister<BookingFormData>;
};

function FormDateSection({ slots, day, register }: FormDateSectionProps): JSX.Element {
  return (
    <fieldset className="booking-form__date-section">
      <legend className="booking-form__date-title">{day}</legend>
      <div className="booking-form__date-inner-wrapper">
        {slots.map((slot) => {
          const slotId = `${dayValue[day]}${formatSlotId(slot.time)}`;

          return (
            <FormSlot
              key={slotId}
              time={slot.time}
              isAvailable={slot.isAvailable}
              slotId={slotId}
              register={register}
            />
          );
        })}
      </div>
    </fieldset>
  );
}

export default FormDateSection;
