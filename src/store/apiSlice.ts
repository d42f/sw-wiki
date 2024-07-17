import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '@/constants';

export const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
});

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQuery,
  tagTypes: ['PersonList', 'Person'],
  endpoints: () => ({}),
});

apiSlice.util;
