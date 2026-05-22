import './not-found-page.css';
import { Helmet } from 'react-helmet-async';
import { AppRoute } from '../../const';
import { Link } from 'react-router-dom';

function NotFoundPage(): JSX.Element {
  return (
    <main className="not-found">
      <Helmet><title>Page is not found 😕</title></Helmet>
      <div className="not-found__content">
        <h1>404</h1>
        <p>Page not found</p>
        <Link to={AppRoute.Root}>Go home</Link>
      </div>
    </main>
  );
}

export default NotFoundPage;
