import { formatDistanceToNow } from 'date-fns';

export const formatTimestamp = (timestamp: string): string => {
  const date = new Date(timestamp);

  return `${formatDistanceToNow(date)} ago`;
};
