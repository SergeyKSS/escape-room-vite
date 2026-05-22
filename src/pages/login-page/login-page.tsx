import { Helmet } from 'react-helmet-async';
import { loginAction } from '../../store/api-actions';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { Navigate, useLocation, Location } from 'react-router-dom';
import { processErrorHandle } from '../../services/process-error-handle';
import { useForm, SubmitHandler } from 'react-hook-form';
import { AuthInfo } from '../../types/auth-info';
import { FormEvent } from 'react';

type LocationState = {
  from?: Location;
};

function LoginPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(
    (state) => state.user.authorizationStatus,
  );
  const isLoginLoading = useAppSelector((state) => state.user.isLoginLoading);
  const location = useLocation();
  const state = location.state as LocationState | null;
  const from = state?.from?.pathname ?? AppRoute.Root;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthInfo>();

  if (authorizationStatus === AuthorizationStatus.Auth) {
    return <Navigate to={from} replace />;
  }

  const onSubmit: SubmitHandler<AuthInfo> = ({ email, password }) => {
    dispatch(loginAction({ email, password })).then((result) => {
      if (loginAction.rejected.match(result)) {
        processErrorHandle(dispatch, result.payload ?? 'Unknown error');
      }
    });
  };

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    void handleSubmit(onSubmit)(evt);
  };

  return (
    <main className="decorated-page login">
      <Helmet>
        <title>Login page</title>
      </Helmet>
      <div className="decorated-page__decor" aria-hidden="true">
        <picture>
          <source
            type="image/webp"
            srcSet="img/content/maniac/maniac-size-m.webp, img/content/maniac/maniac-size-m@2x.webp 2x"
          />
          <img
            src="img/content/maniac/maniac-size-m.jpg"
            srcSet="img/content/maniac/maniac-size-m@2x.jpg 2x"
            width="1366"
            height="768"
            alt=""
          />
        </picture>
      </div>
      <div className="container container--size-l">
        <div className="login__form">
          <form className="login-form" onSubmit={handleFormSubmit}>
            <div className="login-form__inner-wrapper">
              <h1 className="title title--size-s login-form__title">Вход</h1>
              <div className="login-form__inputs">
                <div className="custom-input login-form__input">
                  <label className="custom-input__label" htmlFor="email">
                    E&nbsp;&ndash;&nbsp;mail
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Адрес электронной почты"
                    disabled={isLoginLoading}
                    {...register('email', {
                      required: 'Введите email',
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Введите корректный email',
                      },
                    })}
                  />
                  {errors.email && <span className="form-error">{errors.email.message}</span>}
                </div>
                <div className="custom-input login-form__input">
                  <label className="custom-input__label" htmlFor="password">
                    Пароль
                  </label>
                  <input
                    type="password"
                    id="password"
                    placeholder="Пароль"
                    disabled={isLoginLoading}
                    {...register('password', {
                      required: 'Введите пароль',
                      minLength: {
                        value: 3,
                        message: 'Пароль должен быть не короче 3 символов',
                      },
                      maxLength: {
                        value: 15,
                        message: 'Пароль должен быть не длиннее 15 символов',
                      },
                      pattern: {
                        value: /^(?=.*[A-Za-zА-Яа-я])(?=.*\d).+$/,
                        message:
                          'Пароль должен содержать минимум одну букву и одну цифру',
                      },
                    })}
                  />
                  {errors.password && <span className="form-error">{errors.password.message}</span>}
                </div>
              </div>
              <button
                className="btn btn--accent btn--general login-form__submit"
                type="submit"
                disabled={isLoginLoading}
              >
                Войти
              </button>
            </div>
            <label className="custom-checkbox login-form__checkbox">
              <input
                type="checkbox"
                id="id-order-agreement"
                disabled={isLoginLoading}
                {...register('agreement', {
                  required: 'Нужно согласиться с правилами',
                })}
              />
              <span className="custom-checkbox__icon">
                <svg width="20" height="17" aria-hidden="true">
                  <use xlinkHref="#icon-tick"></use>
                </svg>
              </span>
              <span className="custom-checkbox__label">
                Я&nbsp;согласен с
                <a
                  className="link link--active-silver link--underlined"
                  href="#"
                >
                  правилами обработки персональных данных
                </a>
                &nbsp;и пользовательским соглашением
              </span>
            </label>
            {errors.agreement && <span className="form-error">{errors.agreement.message}</span>}
          </form>
        </div>
      </div>
    </main>
  );
}

export default LoginPage;
