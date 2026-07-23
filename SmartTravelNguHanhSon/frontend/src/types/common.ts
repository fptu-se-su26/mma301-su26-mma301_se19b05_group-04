export type LoadingState = {
  loading: boolean;
  error: string | null;
};

export type NotificationItem = {
  id: string;
  title: string;
  body: string;
  time: string;
  read: boolean;
};
