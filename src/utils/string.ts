export const isString = (v: unknown): v is string => typeof v === 'string';

export const toString = (v: unknown): string => (v ?? '').toString();
