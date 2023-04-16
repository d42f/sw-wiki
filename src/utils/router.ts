export const getRouterUrl = (route: string, query: Record<string, unknown>): string => {
  const queryString = Object.entries(query).map(([k, v]) => v ? `${k}=${v}` : '').filter(i => !!i).join('&');
  return `${route}${queryString ? `?${queryString}` : ''}`;
};