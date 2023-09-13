export const STATUS = {
  active: 'active',
  paused: 'paused',
  finished: 'finished',
  abandonned: 'abandonned',
};

export type Status = keyof typeof STATUS;
