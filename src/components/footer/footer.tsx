import SocialsList from './socials-list';

function Footer(): JSX.Element {
  return (
    <footer className="footer">
      <div className="container container--size-l">
        <div className="socials">
          <SocialsList />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
