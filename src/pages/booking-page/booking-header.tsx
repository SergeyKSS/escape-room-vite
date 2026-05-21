type BookingHeaderProps = {
  title: string;
};

function BookingHeader({title}: BookingHeaderProps): JSX.Element {
  return (
    <div className="page-content__title-wrapper">
      <h1 className="subtitle subtitle--size-l page-content__subtitle">
        Бронирование квеста
      </h1>
      <p className="title title--size-m title--uppercase page-content__title">
        {title}
      </p>
    </div>
  );
}

export default BookingHeader;
