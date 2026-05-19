import { Socials } from '../../const';

type SocialsItemProps = {
  name: (typeof Socials)[number]['name'];
  defaultIcon: (typeof Socials)[number]['defaultIcon'];
  interactiveIcon: (typeof Socials)[number]['interactiveIcon'];
}

function SocialsItem({
  name,
  defaultIcon,
  interactiveIcon,
}: SocialsItemProps): JSX.Element {
  return (
    <li className="socials__item">
      <a
        className="socials__link"
        href="#"
        aria-label={name}
        target="_blank"
        rel="nofollow noopener noreferrer"
      >
        <svg
          className="socials__icon socials__icon--default"
          width="28"
          height="28"
          aria-hidden="true"
        >
          <use xlinkHref={defaultIcon}></use>
        </svg>
        <svg
          className="socials__icon socials__icon--interactive"
          width="28"
          height="28"
          aria-hidden="true"
        >
          <use xlinkHref={interactiveIcon}></use>
        </svg>
      </a>
    </li>
  );
}

export default SocialsItem;
