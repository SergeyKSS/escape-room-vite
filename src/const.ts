export const AppRoute = {
  Root: '/',
  Login: '/login',
  Contacts: '/contacts',
  MyQuests: '/my-quests',
  Quest: '/quest/:id',
  Booking: '/quest/:id/booking',
  NotFound: '/not-found',
} as const;

export const NavItems = [
  { label: 'Квесты', to: AppRoute.MyQuests },
  { label: 'Контакты', to: AppRoute.Contacts },
  { label: 'Мои бронирования', to: AppRoute.Booking },
] as const;

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const Socials = [
  {
    name: 'Skype',
    defaultIcon: '#icon-skype-default',
    interactiveIcon: '#icon-skype-interactive',
  },
  {
    name: 'ВКонтакте',
    defaultIcon: '#icon-vk-default',
    interactiveIcon: '#icon-vk-interactive',
  },
] as const;

export const FilterData = [
  {
    id: 'all',
    width: '26',
    height: '30',
    href: '#icon-all-quests',
    title: 'Все квесты',
  },
  {
    id: 'adventure',
    width: '36',
    height: '30',
    href: '#icon-adventure',
    title: 'Приключения',
  },
  {
    id: 'horror',
    width: '30',
    height: '30',
    href: '#icon-horror',
    title: 'Ужасы',
  },
  {
    id: 'mystic',
    width: '30',
    height: '30',
    href: '#icon-mystic',
    title: 'Мистика',
  },
  {
    id: 'detective',
    width: '40',
    height: '30',
    href: '#icon-detective',
    title: 'Детектив',
  },
  {
    id: 'sciFi',
    width: '28',
    height: '30',
    href: '#icon-sci-fi',
    title: 'Sci-fi',
  },
] as const;

export const DifficultyData = [
  {
    id: 'any',
    title: 'Любой',
  },
  {
    id: 'easy',
    title: 'Лёгкий',
  },
  {
    id: 'middle',
    title: 'Средний',
  },
  {
    id: 'hard',
    title: 'Сложный',
  }
] as const;

export const DifficultyTitle = {
  hard: 'сложный',
  medium: 'средний',
  easy: 'лёгкий',
} as const;

export const QuestTypeTitle = {
  adventures: 'приключения',
  horror: 'ужасы',
  mystic: 'мистика',
  detective: 'детектив',
  'sci-fi': 'sci-fi',
} as const;

export const TIMEOUT_SHOW_ERROR = 2000;

export enum APIRoute {
  Quests = '/quest',
  Reservation = '/reservation',
  Login = '/login',
  Logout = '/logout',
}
