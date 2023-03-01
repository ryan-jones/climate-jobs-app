export const truncate = (text: string, limit: number = 50): string => {
  return text.length > limit ? `${text.slice(0, limit)}...` : text;
};
