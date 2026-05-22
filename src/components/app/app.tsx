import MainPage from '../../pages/main-page/main-page';
import BookingPage from '../../pages/booking-page/booking-page';
import LoginPage from '../../pages/login-page/login-page';
import QuestPage from '../../pages/quest-page/quest-page';
import ReservationPage from '../../pages/reservation-page/reservation-page';
import { useAppSelector } from '../../hooks';
import { AppRoute } from '../../const';
import { HelmetProvider } from 'react-helmet-async';
import { Route, Routes, Navigate } from 'react-router-dom';
import Layout from '../layout/layout';
import PrivateRoute from '../private-route/private-route';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import ContactsPage from '../../pages/contacts-page/contacts-page';

function App(): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.user.authorizationStatus);

  return (
    <HelmetProvider>
      <Routes>
        <Route path={AppRoute.Root} element={<Layout isAuth={authorizationStatus}/>}>
          <Route index element={<MainPage />} />
          <Route path={AppRoute.Quest} element={<QuestPage />} />
          <Route path={AppRoute.Booking} element={<PrivateRoute><BookingPage /></PrivateRoute>} />
          <Route path={AppRoute.Login} element={<LoginPage />} />
          <Route path={AppRoute.MyQuests} element={<PrivateRoute><ReservationPage /></PrivateRoute>} />
          <Route path={AppRoute.Contacts} element={<ContactsPage />} />
          <Route path={AppRoute.NotFound} element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to={AppRoute.NotFound} replace />} />
        </Route>
      </Routes>
    </HelmetProvider>
  );
}

export default App;
