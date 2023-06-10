const envSettings = window as any;
export class Config {
  static graphAnalyzerApi: string = envSettings.GRAPH_ANALYZER_API_URL;
  static graphGeneratorApi: string = envSettings.GRAPH_GENRATOR_API_URL;
}
