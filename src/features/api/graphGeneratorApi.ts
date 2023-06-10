import { emptyGraphGeneratorSplitApi as api } from './emptyApi';
export const addTagTypes = ['health', 'generator', 'converter'] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      healthHealthGet: build.query<HealthHealthGetApiResponse, HealthHealthGetApiArg>({
        query: () => ({ url: `/health` }),
        providesTags: ['health'],
      }),
      generateGeneratePost: build.mutation<
        GenerateGeneratePostApiResponse,
        GenerateGeneratePostApiArg
      >({
        query: (queryArg) => ({
          url: `/generate`,
          method: 'POST',
          body: queryArg.generator,
        }),
        invalidatesTags: ['generator'],
      }),
      convertConvertPost: build.mutation<
        ConvertConvertPostApiResponse,
        ConvertConvertPostApiArg
      >({
        query: (queryArg) => ({
          url: `/convert`,
          method: 'POST',
          body: queryArg.graph,
          params: { file_format: queryArg.fileFormat },
          responseHandler: 'content-type',
        }),
        invalidatesTags: ['converter'],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as graphGeneratorAPI };
export type HealthHealthGetApiResponse = /** status 200 Successful Response */ any;
export type HealthHealthGetApiArg = void;
export type GenerateGeneratePostApiResponse = /** status 200 Successful Response */ Graph;
export type GenerateGeneratePostApiArg = {
  generator: Generator;
};
export type ConvertConvertPostApiResponse = /** status 200 Successful Response */ Blob;
export type ConvertConvertPostApiArg = {
  fileFormat: FileFormat;
  graph: Graph;
};
export type NodeType =
  | 'core'
  | 'core_random'
  | 'core_border_layer'
  | 'distribution_core_border_layer'
  | 'distribution_layer'
  | 'access_layer';
export type NodeAttributes = {
  pop_region: string;
  node_type: NodeType;
  coordinate_x: number;
  coordinate_y: number;
};
export type Node = {
  node_id: string;
  attributes: NodeAttributes;
};
export type EdgeType =
  | 'core_to_core'
  | 'core_to_core_random'
  | 'core_to_core_random_optimization'
  | 'core_to_pop'
  | 'pop_to_pop';
export type EdgeAttributes = {
  weight: number;
  edge_type: EdgeType;
};
export type Edge = {
  node_from: string;
  node_to: string;
  attributes: EdgeAttributes;
};
export type Graph = {
  nodes?: Node[];
  edges?: Edge[];
};
export type ValidationError = {
  loc: (string | number)[];
  msg: string;
  type: string;
};
export type HttpValidationError = {
  detail?: ValidationError[];
};
export type RandomDistribution = 'uniform' | 'normal';
export type Topology = 'gabriel' | 'ring';
export type Generator = {
  l1_pops?: number;
  l2_pops?: number;
  pop_regions?: number;
  core_node_scaling_threshold?: number;
  random_core_nodes?: number;
  random_core_node_connections?: number;
  random_distribution?: RandomDistribution;
  topology?: Topology;
  no_cut_edges_and_nodes?: boolean;
};
export type FileFormat = 'gexf' | 'graphml';
export const {
  useHealthHealthGetQuery,
  useGenerateGeneratePostMutation,
  useConvertConvertPostMutation,
} = injectedRtkApi;
