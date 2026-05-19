import Header from '../header/header';
import Footer from '../footer/footer';
import { Outlet } from 'react-router-dom';
import { AuthorizationStatus } from '../../const';

type LayoutProps = {
  isAuth: AuthorizationStatus;
};

function Layout({isAuth}: LayoutProps): JSX.Element {
  return (
    <div className='wrapper'>
      <Header isAuth={isAuth}/>
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;
