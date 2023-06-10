import type { ConfigFile } from '@rtk-query/codegen-openapi';

const analyzerConfig: ConfigFile = {
  schemaFile: 'http://localhost:8080/api/doc/doc.json',
  apiFile: './src/features/api/emptyApi.ts',
  apiImport: 'emptyGraphAnalyzerSplitApi',
  outputFile: './src/features/api/graphAnalyzerApi.ts',
  exportName: 'graphAnalyzerAPI',
  hooks: true,
  tag: true,
};

export default analyzerConfig;
