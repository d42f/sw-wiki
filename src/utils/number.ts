export const isNumber = (v: unknown): v is number => {
  return typeof v === 'number' && !isNaN(v);
};

export const toNumber = (v: unknown): number | undefined =>
  typeof v === 'string' && isFinite(+v) ? +v : undefined;
