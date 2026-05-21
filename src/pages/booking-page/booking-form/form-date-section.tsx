import FormSlot from './form-slot';
import { dayValue } from '../../../utils/utils';
import { formatSlotId } from '../../../utils/utils';
import { Slot } from '../../../types/form-slot';

type FormDateSectionProps = {
  slots: Slot[];
  day: 'Сегодня' | 'Завтра';
  selectedSlotId: string;
  setSelectedSlotId: (slotId: string) => void;
};

function FormDateSection({ slots, day, selectedSlotId, setSelectedSlotId }: FormDateSectionProps): JSX.Element {
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
              isChecked={selectedSlotId === slotId}
              onChange={() => setSelectedSlotId(slotId)}
              slotId={slotId}
            />
          );
        })}
      </div>
    </fieldset>
  );
}

export default FormDateSection;
