import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { BookingFormData } from '../../../types/booking-data';

type FormContactsProps = {
  register: UseFormRegister<BookingFormData>;
  errors: FieldErrors<BookingFormData>;
  minPeople: number;
  maxPeople: number;
};

function FormContacts({register, errors, minPeople, maxPeople}: FormContactsProps): JSX.Element {
  return (
    <>
      <fieldset className="booking-form__section">
        <legend className="visually-hidden">Контактная информация</legend>
        <div className="custom-input booking-form__input">
          <label className="custom-input__label" htmlFor="name">
            Ваше имя
          </label>
          <input
            type="text"
            id="name"
            placeholder="Имя"
            {...register('contactPerson', {
              required: 'Введите имя',
              pattern: {
                value: /^[А-Яа-яЁёA-Za-z' -]+$/,
                message: 'Имя должно содержать только буквы',
              },
              maxLength: {
                value: 15,
                message: 'Имя должно быть не длиннее 15 символов',
              }
            })}
          />
          {errors.contactPerson && <span>{errors.contactPerson.message}</span>}
        </div>
        <div className="custom-input booking-form__input">
          <label className="custom-input__label" htmlFor="tel">
            Контактный телефон
          </label>
          <input
            type="tel"
            id="tel"
            placeholder="Телефон"
            {...register('phone', {
              required: 'Введите телефон',
              pattern: {
                value: /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/,
                message: 'Введите телефон в формате +7 (000) 000-00-00',
              },
            })}
          />
          {errors.phone && <span>{errors.phone.message}</span>}
        </div>
        <div className="custom-input booking-form__input">
          <label className="custom-input__label" htmlFor="person">
            Количество участников
          </label>
          <input
            type="number"
            id="person"
            placeholder="Количество участников"
            {...register('peopleCount', {
              required: 'Введите количество участников',
              valueAsNumber: true,
              min: {
                value: minPeople,
                message: `Минимум ${minPeople} участника`,
              },
              max: {
                value: maxPeople,
                message: `Максимум ${maxPeople} участников`,
              },
            })}
          />
          {errors.peopleCount && <span>{errors.peopleCount.message}</span>}
        </div>
        <label className="custom-checkbox booking-form__checkbox booking-form__checkbox--children">
          <input
            type="checkbox"
            id="children"
            defaultChecked
            {...register('withChildren')}
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
          {...register('agreement', {
            required: 'Нужно согласиться с правилами',
          })}
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
        {errors.agreement && <span>{errors.agreement.message}</span>}
      </label>
    </>
  );
}

export default FormContacts;
