import { IPerson } from '@/models/IPerson';

export const getPersonId = (person: IPerson): string =>
  person.url
    .split('/')
    .filter((e) => !!e)
    .pop() as string;

export const getPersonLabel = (person: IPerson): string =>
  person.name
    .split(/[\s-]+/)
    .map((w) => w.charAt(0))
    .slice(0, 2)
    .join('')
    .toUpperCase();
