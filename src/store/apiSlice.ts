import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_PEOPLE_URL } from '@/constants';
import { isHydrateAction } from '@/utils/store';
import { AppState, AppThunk } from './store';
import { IPerson, IPersonList } from '@/models/IPerson';
import { Draft } from '@reduxjs/toolkit';
import { IComment, IRawComment } from '@/models/IComment';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
  }),
  extractRehydrationInfo: (action, { reducerPath }): any => {
    if (isHydrateAction(action)) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: ['PersonList', 'Person', 'PersonComments'],
  endpoints: (builder) => ({
    getPersonList: builder.query<IPersonList, number>({
      query: (page) => `${API_PEOPLE_URL}?page=${page}`,
      providesTags: (result, error, page) => [{ type: 'PersonList', id: page }],
    }),

    getPerson: builder.query<IPerson, string>({
      query: (id) => `${API_PEOPLE_URL}/${id}`,
      providesTags: (result, error, id) => [{ type: 'Person', id }],
    }),

    updatePerson: builder.mutation<
      IPerson,
      { id: string; patch: Partial<Omit<IPerson, 'id'>> }
    >({
      query: ({ id, patch }) => ({
        url: `${API_PEOPLE_URL}/${id}`,
        method: 'PUT',
        body: patch,
      }),
      onQueryStarted: async ({ id, patch }, { dispatch, getState }) => {
        const person = selectPerson(getState() as AppState, id);
        if (person) {
          const patchedPerson = { ...person, ...patch };
          dispatch(updatePersonListQueryData(patchedPerson));
          dispatch(updatePersonQueryData(patchedPerson));
        }
      },
    }),

    getPersonComments: builder.query<IComment[], string>({
      query: (id) => `${API_PEOPLE_URL}/${id}/comments`,
      providesTags: (result, error, id) => [{ type: 'PersonComments', id }],
    }),

    addPersonComment: builder.mutation<
      IComment,
      { id: string; comment: IRawComment }
    >({
      query: ({ id, comment }) => ({
        url: `${API_PEOPLE_URL}/${id}/comments`,
        method: 'POST',
        body: comment,
      }),
      onQueryStarted: async ({ id }, { dispatch, queryFulfilled }) => {
        const comment = (await queryFulfilled).data;
        dispatch(updatePersonCommentsQueryData({ id, comment }));
      },
    }),
  }),
});

const { selectInvalidatedBy, updateQueryData } = apiSlice.util;

const updatePersonListQueryData =
  (person: IPerson): AppThunk<void> =>
  (dispatch, getState) => {
    for (const { endpointName, originalArgs } of selectInvalidatedBy(
      getState() as AppState,
      [{ type: 'PersonList' }]
    )) {
      if (endpointName === 'getPersonList') {
        dispatch(
          updateQueryData(
            endpointName,
            originalArgs,
            (draft: Draft<IPersonList>) => {
              draft.results = draft.results.map((value) =>
                value.id === person.id ? person : value
              );
            }
          )
        );
      }
    }
  };

const updatePersonQueryData =
  (person: IPerson): AppThunk<void> =>
  (dispatch) =>
    dispatch(
      updateQueryData('getPerson', person.id, (draft: Draft<IPerson>) => ({
        ...draft,
        ...person,
      }))
    );

const updatePersonCommentsQueryData =
  ({ id, comment }: { id: string; comment: IComment }): AppThunk<void> =>
  (dispatch, getState) => {
    for (const { endpointName, originalArgs } of selectInvalidatedBy(
      getState() as AppState,
      [{ type: 'PersonComments', id }]
    )) {
      if (endpointName === 'getPersonComments') {
        dispatch(
          updateQueryData(
            endpointName,
            originalArgs,
            (draft: Draft<IComment[]>) => [comment, ...draft]
          )
        );
      }
    }
  };

export const {
  useGetPersonListQuery,
  useGetPersonQuery,
  useUpdatePersonMutation,
  useGetPersonCommentsQuery,
  useAddPersonCommentMutation,
  util: { getRunningQueriesThunk },
} = apiSlice;

export const { getPersonList, getPerson } = apiSlice.endpoints;

export const selectPersonList = (
  state: AppState,
  page: number
): IPersonList | undefined => {
  const selector = getPersonList.select(page);
  return selector(state).data;
};

export const selectPerson = (
  state: AppState,
  id: string
): IPerson | undefined => {
  const selector = getPerson.select(id);
  return selector(state).data;
};
