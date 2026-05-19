import { NavItems } from '../../const';
import { NavLink } from 'react-router-dom';

type NavItemProps = {
  label: (typeof NavItems)[number]['label'];
  to: (typeof NavItems)[number]['to'];
};

function NavItem({ label, to }: NavItemProps): JSX.Element {
  return (
    <li className="main-nav__item">
      <NavLink
        className={({ isActive }) => isActive ? 'link active' : 'link'}
        to={to}
      >
        {label}
      </NavLink>
    </li>
  );
}

export default NavItem;
