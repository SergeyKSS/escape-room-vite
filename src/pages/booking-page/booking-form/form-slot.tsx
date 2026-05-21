type FormSlotProps = {
  time: string;
  isAvailable: boolean;
  isChecked: boolean;
  onChange: () => void;
  slotId: string;
};

function FormSlot({
  time,
  isAvailable,
  isChecked,
  onChange,
  slotId,
}: FormSlotProps): JSX.Element {

  return (
    <label className="custom-radio booking-form__date">
      <input
        type="radio"
        id={slotId}
        name="date"
        required
        value={slotId}
        checked={isChecked}
        onChange={onChange}
        disabled={!isAvailable}
      />
      <span className="custom-radio__label">{time}</span>
    </label>
  );
}

export default FormSlot;
