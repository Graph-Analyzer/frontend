import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Config } from '../../config';

export const emptyGraphAnalyzerSplitApi = createApi({
  reducerPath: 'GraphAnalyzerApi',
  baseQuery: fetchBaseQuery({ baseUrl: Config.graphAnalyzerApi + '/api' }),
  endpoints: () => ({}),
});

export const emptyGraphGeneratorSplitApi = createApi({
  reducerPath: 'GraphGeneratorApi',
  baseQuery: fetchBaseQuery({ baseUrl: Config.graphGeneratorApi }),
  endpoints: () => ({}),
});
