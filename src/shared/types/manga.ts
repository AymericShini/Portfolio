import { Timestamp } from '@firebase/firestore';

export type Status = 'active' | 'paused';

export type Manga = {
  name: string;
  url: string;
  chapter: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  favorite: boolean;
  mangaStatus: Status;
  readingStatus: Status;
};
