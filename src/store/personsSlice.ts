import type { Draft } from '@reduxjs/toolkit';

import { apiSlice } from '@/store/apiSlice';
import { IPerson, IPersonList } from '@/models/IPerson';
import { AppState } from './store';

const withId = (person: IPerson): IPerson => ({
    ...person,
    id: person.url.split('/').filter(e => !!e).pop() as string,
});

export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getPersonList: builder.query<IPersonList, number>({
            query: page => ({
                url: `/people?page=${page}`,
            }),
            transformResponse: (list: IPersonList) => ({ ...list, results: list.results.map(withId) }),
            providesTags: (result, error, page) => [{ type: 'PersonList', id: page }],
        }),

        getPerson: builder.query<IPerson, string>({
            query: id => `/people/${id}`,
            transformResponse: (person: IPerson, meta, id) => ({ ...person, id }),
            providesTags: (result, error, id) => [{ type: 'Person', id }],
        }),

        updatePerson: builder.mutation<IPerson, { id: string; patch: Partial<Omit<IPerson, 'id'>> }>({
          queryFn: async ({ id, patch }, { dispatch, getState }) => {
            const person = selectPerson(getState() as AppState, id);
            const patchedPerson = { ...person, ...patch };
            const { selectInvalidatedBy, updateQueryData } = extendedApiSlice.util;
            for (const { endpointName, originalArgs } of selectInvalidatedBy(getState() as AppState, [{ type: 'PersonList' }])) {
                if (endpointName === 'getPersonList') {
                    dispatch(updateQueryData(endpointName, originalArgs, (draft: Draft<IPersonList>) => {
                      draft.results = draft.results.map(person => person.id === id ? patchedPerson : person);
                    }));
                }
            }
            return { data: patchedPerson };
          },
        }),
    }),
});

export const { useGetPersonListQuery, useGetPersonQuery, useUpdatePersonMutation } = extendedApiSlice;

const selectPerson = (state: AppState, id: string): IPerson => {
  const selector = extendedApiSlice.endpoints.getPerson.select(id);
  return selector(state).data as IPerson;
};
