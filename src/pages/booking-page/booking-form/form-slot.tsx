import { UseFormRegister } from 'react-hook-form';
import { BookingFormData } from '../../../types/booking-data';

type FormSlotProps = {
  time: string;
  isAvailable: boolean;
  slotId: string;
  register: UseFormRegister<BookingFormData>;
};

function FormSlot({
  time,
  isAvailable,
  slotId,
  register,
}: FormSlotProps): JSX.Element {

  return (
    <label className="custom-radio booking-form__date">
      <input
        type="radio"
        id={slotId}
        value={slotId}
        disabled={!isAvailable}
        {...register('slotId', {
          required: 'Выберите дату и время',
        })}
      />
      <span className="custom-radio__label">{time}</span>
    </label>
  );
}

export default FormSlot;
