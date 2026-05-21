const formatSlotId = (time: string): string => `${time.replace(':', 'h')}m`;

const dayValue = {
  Сегодня: 'today',
  Завтра: 'tomorrow',
} as const;

export { formatSlotId, dayValue };
