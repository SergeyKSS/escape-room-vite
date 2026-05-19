export const AppRoute = {
  Root: '/',
  Login: '/login',
  Contacts: '/contacts',
  Quests: '/quests',
  Quest: '/quest/:id',
  Booking: '/booking',
  NotFound: '/not-found',
} as const;

export const NavItems = [
  { label: 'Квесты', to: AppRoute.Quests },
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
