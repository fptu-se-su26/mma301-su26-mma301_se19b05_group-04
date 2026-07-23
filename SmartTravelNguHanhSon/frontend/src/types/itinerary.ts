import { Destination } from './destination';

export type SavedItinerary = {
  id: string;
  title: string;
  content: string;
  type: 'manual' | 'ai';
  destinations?: Destination[];
  createdAt: string;
};
