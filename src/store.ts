import { AnyAction, combineReducers, configureStore, Reducer } from '@reduxjs/toolkit';
import { graphAnalyzerAPI } from './features/api/graphAnalyzerApi';
import { graphGeneratorAPI } from './features/api/graphGeneratorApi';
import navBarReducer from './features/nav/navBarSlice';
import averageClusteringCoefficientReducer from './features/graph-property/averageClusteringCoefficient/averageClusteringCoefficientSlice';
import connectedReducer from './features/graph-property/connected/connectedSlice';
import degreeAssortativityCoefficientReducer from './features/graph-property/degreeAssortativityCoefficient/degreeAssortativityCoefficientSlice';
import degreeCorrelationReducer from './features/graph-property/degreeCorrelation/degreeCorrelationSlice';
import degreeDistributionReducer from './features/graph-property/degreeDistribution/degreeDistributionSlice';
import densityReducer from './features/graph-property/density/densitySlice';
import diameterReducer from './features/graph-property/diameter/diameterSlice';
import generalInformationReducer from './features/graph-property/generalInformation/generalInformationSlice';
import hasCutEdgeReducer from './features/graph-property/hasCutEdge/hasCutEdgeSlice';
import hasCutVertexReducer from './features/graph-property/hasCutVertex/hasCutVertexSlice';
import networkGraphReducer from './features/graph/networkGraphSlice';
import generatorReducer from './features/generator/generatorSlice';
import robustnessReducer from './features/graph-property/robustness/robustnessSlice';

const combinedReducer = combineReducers({
  [graphAnalyzerAPI.reducerPath]: graphAnalyzerAPI.reducer,
  [graphGeneratorAPI.reducerPath]: graphGeneratorAPI.reducer,
  navBar: navBarReducer,
  averageClusteringCoefficient: averageClusteringCoefficientReducer,
  connected: connectedReducer,
  degreeAssortativityCoefficient: degreeAssortativityCoefficientReducer,
  degreeCorrelation: degreeCorrelationReducer,
  degreeDistribution: degreeDistributionReducer,
  density: densityReducer,
  diameter: diameterReducer,
  generalInformation: generalInformationReducer,
  hasCutEdge: hasCutEdgeReducer,
  hasCutVertex: hasCutVertexReducer,
  networkGraph: networkGraphReducer,
  generator: generatorReducer,
  robustness: robustnessReducer,
});

export const resetState = {
  type: 'resetState',
};

const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
  if (action.type === 'resetState') {
    state = {} as RootState;
  }
  return combinedReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(graphAnalyzerAPI.middleware)
      .concat(graphGeneratorAPI.middleware),
});

export type RootState = ReturnType<typeof combinedReducer>;
export type AppDispatch = typeof store.dispatch;
