export type ChatMessage = {
  id: string;
  role: 'user' | 'ai';
  content: string;
  createdAt: string;
};

export type AIItineraryRequest = {
  duration: string;
  interests: string[];
  budget: string;
  transport: string;
  people: number;
};
