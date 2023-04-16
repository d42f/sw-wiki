import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseQuery = fetchBaseQuery({
    baseUrl: 'https://swapi.dev/api',
});

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: baseQuery,
    tagTypes: [
      'PersonList',
      'Person',
    ],
    endpoints: () => ({}),
});

apiSlice.util;
