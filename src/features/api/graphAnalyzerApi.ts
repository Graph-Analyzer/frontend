import { emptyGraphAnalyzerSplitApi as api } from './emptyApi';
export const addTagTypes = [
  'graph-properties',
  'graph-properties-query',
  'infrastructure',
  'upload',
] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getGraphPropertyAverageClusteringCoefficient: build.query<
        GetGraphPropertyAverageClusteringCoefficientApiResponse,
        GetGraphPropertyAverageClusteringCoefficientApiArg
      >({
        query: () => ({ url: `/graph-property/average-clustering-coefficient` }),
        providesTags: ['graph-properties'],
      }),
      getGraphPropertyConnected: build.query<
        GetGraphPropertyConnectedApiResponse,
        GetGraphPropertyConnectedApiArg
      >({
        query: () => ({ url: `/graph-property/connected` }),
        providesTags: ['graph-properties'],
      }),
      getGraphPropertyDegreeAssortativityCoefficient: build.query<
        GetGraphPropertyDegreeAssortativityCoefficientApiResponse,
        GetGraphPropertyDegreeAssortativityCoefficientApiArg
      >({
        query: () => ({ url: `/graph-property/degree-assortativity-coefficient` }),
        providesTags: ['graph-properties'],
      }),
      getGraphPropertyDegreeCorrelation: build.query<
        GetGraphPropertyDegreeCorrelationApiResponse,
        GetGraphPropertyDegreeCorrelationApiArg
      >({
        query: () => ({ url: `/graph-property/degree-correlation` }),
        providesTags: ['graph-properties'],
      }),
      getGraphPropertyDegreeDistribution: build.query<
        GetGraphPropertyDegreeDistributionApiResponse,
        GetGraphPropertyDegreeDistributionApiArg
      >({
        query: () => ({ url: `/graph-property/degree-distribution` }),
        providesTags: ['graph-properties'],
      }),
      getGraphPropertyDensity: build.query<
        GetGraphPropertyDensityApiResponse,
        GetGraphPropertyDensityApiArg
      >({
        query: () => ({ url: `/graph-property/density` }),
        providesTags: ['graph-properties'],
      }),
      getGraphPropertyDiameter: build.query<
        GetGraphPropertyDiameterApiResponse,
        GetGraphPropertyDiameterApiArg
      >({
        query: () => ({ url: `/graph-property/diameter` }),
        providesTags: ['graph-properties'],
      }),
      getGraphPropertyFullGraph: build.query<
        GetGraphPropertyFullGraphApiResponse,
        GetGraphPropertyFullGraphApiArg
      >({
        query: () => ({ url: `/graph-property/full-graph` }),
        providesTags: ['graph-properties'],
      }),
      getGraphPropertyGeneralInformation: build.query<
        GetGraphPropertyGeneralInformationApiResponse,
        GetGraphPropertyGeneralInformationApiArg
      >({
        query: () => ({ url: `/graph-property/general-information` }),
        providesTags: ['graph-properties'],
      }),
      getGraphPropertyHasCutEdge: build.query<
        GetGraphPropertyHasCutEdgeApiResponse,
        GetGraphPropertyHasCutEdgeApiArg
      >({
        query: () => ({ url: `/graph-property/has-cut-edge` }),
        providesTags: ['graph-properties'],
      }),
      getGraphPropertyHasCutVertex: build.query<
        GetGraphPropertyHasCutVertexApiResponse,
        GetGraphPropertyHasCutVertexApiArg
      >({
        query: () => ({ url: `/graph-property/has-cut-vertex` }),
        providesTags: ['graph-properties'],
      }),
      postGraphPropertyQuery: build.mutation<
        PostGraphPropertyQueryApiResponse,
        PostGraphPropertyQueryApiArg
      >({
        query: (queryArg) => ({
          url: `/graph-property/query`,
          method: 'POST',
          body: queryArg.actionQueryRequestModel,
        }),
        invalidatesTags: ['graph-properties-query'],
      }),
      getGraphPropertyRobustness: build.query<
        GetGraphPropertyRobustnessApiResponse,
        GetGraphPropertyRobustnessApiArg
      >({
        query: () => ({ url: `/graph-property/robustness` }),
        providesTags: ['graph-properties'],
      }),
      getLive: build.query<GetLiveApiResponse, GetLiveApiArg>({
        query: () => ({ url: `/live` }),
        providesTags: ['infrastructure'],
      }),
      getReady: build.query<GetReadyApiResponse, GetReadyApiArg>({
        query: () => ({ url: `/ready` }),
        providesTags: ['infrastructure'],
      }),
      postUpload: build.mutation<PostUploadApiResponse, PostUploadApiArg>({
        query: (queryArg) => ({ url: `/upload`, method: 'POST', body: queryArg.body }),
        invalidatesTags: ['upload'],
      }),
      getUploadStatus: build.query<GetUploadStatusApiResponse, GetUploadStatusApiArg>({
        query: () => ({ url: `/upload-status` }),
        providesTags: ['upload'],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as graphAnalyzerAPI };
export type GetGraphPropertyAverageClusteringCoefficientApiResponse =
  /** status 200 OK */ ResponderAverageClusteringCoefficientProjection;
export type GetGraphPropertyAverageClusteringCoefficientApiArg = void;
export type GetGraphPropertyConnectedApiResponse =
  /** status 200 OK */ ResponderConnectedProjection;
export type GetGraphPropertyConnectedApiArg = void;
export type GetGraphPropertyDegreeAssortativityCoefficientApiResponse =
  /** status 200 OK */ ResponderDegreeAssortativityCoefficientProjection;
export type GetGraphPropertyDegreeAssortativityCoefficientApiArg = void;
export type GetGraphPropertyDegreeCorrelationApiResponse =
  /** status 200 OK */ ResponderDegreeCorrelationProjection;
export type GetGraphPropertyDegreeCorrelationApiArg = void;
export type GetGraphPropertyDegreeDistributionApiResponse =
  /** status 200 OK */ ResponderDegreeDistributionProjection;
export type GetGraphPropertyDegreeDistributionApiArg = void;
export type GetGraphPropertyDensityApiResponse =
  /** status 200 OK */ ResponderDensityProjection;
export type GetGraphPropertyDensityApiArg = void;
export type GetGraphPropertyDiameterApiResponse =
  /** status 200 OK */ ResponderDiameterProjection;
export type GetGraphPropertyDiameterApiArg = void;
export type GetGraphPropertyFullGraphApiResponse =
  /** status 200 OK */ ResponderFullGraphProjection;
export type GetGraphPropertyFullGraphApiArg = void;
export type GetGraphPropertyGeneralInformationApiResponse =
  /** status 200 OK */ ResponderGeneralInformationProjection;
export type GetGraphPropertyGeneralInformationApiArg = void;
export type GetGraphPropertyHasCutEdgeApiResponse =
  /** status 200 OK */ ResponderHasCutEdgeProjection;
export type GetGraphPropertyHasCutEdgeApiArg = void;
export type GetGraphPropertyHasCutVertexApiResponse =
  /** status 200 OK */ ResponderHasCutVertexProjection;
export type GetGraphPropertyHasCutVertexApiArg = void;
export type PostGraphPropertyQueryApiResponse =
  /** status 200 OK */ ResponderQueryProjection;
export type PostGraphPropertyQueryApiArg = {
  /** Type */
  actionQueryRequestModel: ActionQueryRequestModel;
};
export type GetGraphPropertyRobustnessApiResponse =
  /** status 200 OK */ ResponderRobustnessProjection;
export type GetGraphPropertyRobustnessApiArg = void;
export type GetLiveApiResponse = unknown;
export type GetLiveApiArg = void;
export type GetReadyApiResponse = unknown;
export type GetReadyApiArg = void;
export type PostUploadApiResponse = /** status 200 OK */ ResponderUploadProjection;
export type PostUploadApiArg = {
  body: {
    file: Blob;
  };
};
export type GetUploadStatusApiResponse =
  /** status 200 OK */ ResponderUploadStatusProjection;
export type GetUploadStatusApiArg = void;
export type ResponderAverageClusteringCoefficientProjection = {
  value: number;
};
export type ResponderConnectedProjection = {
  status: boolean;
};
export type ResponderDegreeAssortativityCoefficientProjection = {
  value: number;
};
export type ResponderDegreeCorrelationValueProjection = {
  average: number;
  degree: number;
};
export type ResponderDegreeCorrelationProjection = {
  values: ResponderDegreeCorrelationValueProjection[];
};
export type ResponderDegreeDistributionValueProjection = {
  amount: number;
  degree: number;
};
export type ResponderDegreeDistributionProjection = {
  values: ResponderDegreeDistributionValueProjection[];
};
export type ResponderDensityProjection = {
  value: number;
};
export type ResponderDiameterProjection = {
  diameter: number;
  hops: number;
};
export type ResponderFullGraphEdgeProjection = {
  from: string;
  id: string;
  to: string;
  weight: number;
};
export type ResponderFullGraphNodeProjection = {
  id: string;
  label: string;
  size: number;
};
export type ResponderFullGraphProjection = {
  edges: ResponderFullGraphEdgeProjection[];
  nodes: ResponderFullGraphNodeProjection[];
};
export type ResponderGeneralInformationProjection = {
  created_at: string;
  edges: number;
  name: string;
  nodes: number;
};
export type ResponderHasCutEdgeProjection = {
  status: boolean;
};
export type ResponderHasCutVertexProjection = {
  status: boolean;
};
export type ResponderQueryEdgeProjection = {
  from: string;
  fromLabel: string;
  to: string;
  toLabel: string;
};
export type ResponderQueryNodeProjection = {
  id: string;
  label: string;
};
export type ResponderQueryProjection = {
  edges: ResponderQueryEdgeProjection[];
  nodes: ResponderQueryNodeProjection[];
};
export type ActionQueryRequestModel = {
  type: 'cut_edges' | 'cut_vertices';
};
export type ResponderRobustnessProjection = {
  nodes: number;
  percentage: number;
};
export type ResponderUploadProjection = {
  status: boolean;
};
export type ResponderUploadErrorProjection = {
  error?: string;
};
export type ResponderUploadStatusProjection = {
  healthy: boolean;
};
export const {
  useGetGraphPropertyAverageClusteringCoefficientQuery,
  useGetGraphPropertyConnectedQuery,
  useGetGraphPropertyDegreeAssortativityCoefficientQuery,
  useGetGraphPropertyDegreeCorrelationQuery,
  useGetGraphPropertyDegreeDistributionQuery,
  useGetGraphPropertyDensityQuery,
  useGetGraphPropertyDiameterQuery,
  useGetGraphPropertyFullGraphQuery,
  useGetGraphPropertyGeneralInformationQuery,
  useGetGraphPropertyHasCutEdgeQuery,
  useGetGraphPropertyHasCutVertexQuery,
  usePostGraphPropertyQueryMutation,
  useGetGraphPropertyRobustnessQuery,
  useGetLiveQuery,
  useGetReadyQuery,
  usePostUploadMutation,
  useGetUploadStatusQuery,
} = injectedRtkApi;
