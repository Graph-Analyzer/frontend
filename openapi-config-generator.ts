import type { ConfigFile } from '@rtk-query/codegen-openapi';

export const generatorConfig: ConfigFile = {
  schemaFile: 'http://127.0.0.1:8082/openapi.json',
  apiFile: './src/features/api/emptyApi.ts',
  apiImport: 'emptyGraphGeneratorSplitApi',
  outputFile: './src/features/api/graphGeneratorApi.ts',
  exportName: 'graphGeneratorAPI',
  hooks: true,
  tag: true,
};

export default generatorConfig;
