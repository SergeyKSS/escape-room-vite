import NavItem from './nav-item';
import { NavItems, AuthorizationStatus, AppRoute } from '../../const';

type NavListProps = {
  isAuth: AuthorizationStatus;
};

function NavList({ isAuth }: NavListProps): JSX.Element {
  const filteredNavItems = NavItems.filter(
    (item) => item.to !== AppRoute.Booking || isAuth === AuthorizationStatus.Auth
  );

  return (
    <ul className="main-nav__list">
      {filteredNavItems.map((item) => (
        <NavItem
          key={item.label}
          label={item.label}
          to={item.to}
        />
      ))}
    </ul>
  );
}

export default NavList;
