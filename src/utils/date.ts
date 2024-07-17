export const formatDateTime = (date: Date | string): string => {
  date = new Date(date);
  return `${date.toLocaleTimeString()} ${date.toLocaleDateString()}`;
};
