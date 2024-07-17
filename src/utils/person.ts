export const getLabel = (name: string): string =>
  name
    .split(/[\s-]+/)
    .map((w) => w.charAt(0))
    .slice(0, 2)
    .join('')
    .toUpperCase();
