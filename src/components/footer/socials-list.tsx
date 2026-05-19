import { Socials } from '../../const';
import SocialsItem from './socials-item';

function SocialsList(): JSX.Element {
  return (
    <ul className="socials__list">
      {Socials.map((item) => (
        <SocialsItem
          key={item.name}
          name={item.name}
          defaultIcon={item.defaultIcon}
          interactiveIcon={item.interactiveIcon}
        />
      ))}
    </ul>
  );
}

export default SocialsList;
