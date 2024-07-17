import cacheData from 'memory-cache';
import { API_BASE_URL, API_PEOPLE_URL } from '@/constants';
import { IPerson, IPersonList } from '@/models/IPerson';
import { NextApiRequest, NextApiResponse } from 'next';
import { getPersonId } from '@/utils/person';

const LIST_CACHE: Record<string, IPersonList> =
  cacheData.get('LIST_CACHE') || {};
const PERSON_CACHE: Record<string, IPerson> =
  cacheData.get('PERSON_CACHE') || {};

const saveCache = () => {
  cacheData.put('LIST_CACHE', LIST_CACHE);
  cacheData.put('PERSON_CACHE', PERSON_CACHE);
};

const getPeople = async (page: string, res: NextApiResponse) => {
  if (!LIST_CACHE[page]) {
    const result = await fetch(`${API_BASE_URL}${API_PEOPLE_URL}?page=${page}`);
    const data = await result.json();
    LIST_CACHE[page] = {
      ...data,
      results: data.results.map((item: IPerson) => ({
        ...item,
        id: getPersonId(item),
      })),
    };
    saveCache();
  }
  res.status(200).json(LIST_CACHE[page]);
};

const getPerson = async (id: string, res: NextApiResponse) => {
  if (!PERSON_CACHE[id]) {
    const result = await fetch(`${API_BASE_URL}${API_PEOPLE_URL}/${id}`);
    const data = await result.json();
    PERSON_CACHE[id] = {
      ...data,
      id: getPersonId(data),
    };
    saveCache();
  }
  res.status(200).json(PERSON_CACHE[id]);
};

const updatePerson = async (person: IPerson, res: NextApiResponse) => {
  if (PERSON_CACHE[person.id]) {
    PERSON_CACHE[person.id] = person;
  }
  Object.keys(LIST_CACHE).forEach((key) => {
    LIST_CACHE[key].results = LIST_CACHE[key].results.map((item) =>
      item.id === person.id ? person : item
    );
  });
  saveCache();
  res.status(200).json(person);
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!req.query.slug) {
    switch (req.method?.toLowerCase()) {
      case 'get':
        const page = req.query.page as string;
        await getPeople(page, res);
        break;
      default:
        res.status(400).json({ message: 'Invalid method.' });
    }
  } else {
    switch (req.method?.toLowerCase()) {
      case 'get':
        const id = req.query.slug.toString();
        await getPerson(id, res);
        break;
      case 'put':
        await updatePerson(req.body as IPerson, res);
        break;
      default:
        res.status(400).json({ message: 'Invalid method.' });
    }
  }
}
