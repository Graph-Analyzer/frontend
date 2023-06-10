import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ResponderHasCutVertexProjection } from '../../api/graphAnalyzerApi';
import { RootState } from '../../../store';

type HasCutVertexData = ResponderHasCutVertexProjection | undefined;

interface HasCutVertexState {
  data: HasCutVertexData;
}

const initialState = {
  data: undefined,
} as HasCutVertexState;

export const hasCutVertexSlice = createSlice({
  name: 'hasCutVertex',
  initialState,
  reducers: {
    updateHasCutVertexData: (state, action: PayloadAction<HasCutVertexData>) => {
      state.data = action.payload;
    },
  },
});

export const { updateHasCutVertexData } = hasCutVertexSlice.actions;

export default hasCutVertexSlice.reducer;

export const selectHasCutVertex = (state: RootState) => state.hasCutVertex.data;
