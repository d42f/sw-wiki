import cacheData from 'memory-cache';
import { NextApiRequest, NextApiResponse } from 'next';
import { API_BASE_URL, API_PEOPLE_URL } from '@/constants';
import { IPerson, IPersonList } from '@/models/IPerson';
import { IComment, IRawComment } from '@/models/IComment';
import { getPersonId } from '@/utils/person';
import { getUuid } from '@/utils/uuid';

const LIST_CACHE: Record<string, IPersonList> =
  cacheData.get('LIST_CACHE') || {};
const PERSON_CACHE: Record<string, IPerson> =
  cacheData.get('PERSON_CACHE') || {};
const COMMENTS_CACHE: Record<string, IComment[]> =
  cacheData.get('COMMENTS_CACHE') || {};

const saveCache = () => {
  cacheData.put('LIST_CACHE', LIST_CACHE);
  cacheData.put('PERSON_CACHE', PERSON_CACHE);
  cacheData.put('COMMENTS_CACHE', COMMENTS_CACHE);
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

const getComments = async (id: string, res: NextApiResponse) => {
  if (!COMMENTS_CACHE[id]) {
    COMMENTS_CACHE[id] = [];
  }
  res.status(200).json(COMMENTS_CACHE[id]);
};

const addComment = async (
  id: string,
  comment: IRawComment,
  res: NextApiResponse
) => {
  if (!COMMENTS_CACHE[id]) {
    COMMENTS_CACHE[id] = [];
  }
  const data = {
    ...comment,
    id: getUuid(),
    date: new Date().toISOString(),
  };
  COMMENTS_CACHE[id].unshift(data);
  saveCache();
  res.status(200).json(data);
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const slug = Array.isArray(req.query.slug) ? req.query.slug : undefined;
  if (!slug) {
    switch (req.method?.toLowerCase()) {
      case 'get':
        const page = req.query.page as string;
        await getPeople(page, res);
        break;
      default:
        res.status(400).json({ message: 'Invalid method.' });
    }
  } else if (slug.includes('comments')) {
    const id = slug[0];
    switch (req.method?.toLowerCase()) {
      case 'get':
        await getComments(id, res);
        break;
      case 'post':
        await addComment(id, req.body as IComment, res);
        break;
      default:
        res.status(400).json({ message: 'Invalid method.' });
    }
  } else {
    const id = slug[0];
    switch (req.method?.toLowerCase()) {
      case 'get':
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
