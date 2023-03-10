import { formatDistanceToNow } from 'date-fns';

export const formatTimestamp = (timestamp: string): string => {
  console.log('timestamp', timestamp);
  const date = new Date(timestamp);

  return `${formatDistanceToNow(date)} ago`;
};
