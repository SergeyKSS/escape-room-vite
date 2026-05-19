import NavList from './nav-list';
import { AuthorizationStatus } from '../../const';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';

type HeaderProps = {
  isAuth: AuthorizationStatus;
};

function Header({ isAuth }: HeaderProps): JSX.Element {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate(AppRoute.Login);
  };

  const handleLogoutClick = () => {
    navigate(AppRoute.Root);
  };

  return (
    <header className="header">
      <div className="container container--size-l">
        <span className="logo header__logo">
          <svg width="134" height="52" aria-hidden="true">
            <use xlinkHref="#logo"></use>
          </svg>
        </span>
        <nav className="main-nav header__main-nav">
          <NavList isAuth={isAuth}/>
        </nav>
        <div className="header__side-nav">
          {isAuth === AuthorizationStatus.Auth ? (
            <button
              onClick={handleLogoutClick}
              type='button'
              className="btn btn--accent header__side-item"
            >
              Выйти
            </button>
          ) : (
            <button
              onClick={handleLoginClick}
              type='button'
              className="btn btn--accent header__side-item"
            >
              Войти
            </button>
          )}
          <a
            className="link header__side-item header__phone-link"
            href="tel:88003335599"
          >
            8 (000) 111-11-11
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;
