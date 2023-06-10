import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ResponderHasCutEdgeProjection } from '../../api/graphAnalyzerApi';
import { RootState } from '../../../store';

type HasCutEdgeData = ResponderHasCutEdgeProjection | undefined;

interface HasCutEdgeState {
  data: HasCutEdgeData;
}

const initialState = {
  data: undefined,
} as HasCutEdgeState;

export const hasCutEdgeSlice = createSlice({
  name: 'hasCutEdge',
  initialState,
  reducers: {
    updateHasCutEdgeData: (state, action: PayloadAction<HasCutEdgeData>) => {
      state.data = action.payload;
    },
  },
});

export const { updateHasCutEdgeData } = hasCutEdgeSlice.actions;

export default hasCutEdgeSlice.reducer;

export const selectHasCutEdge = (state: RootState) => state.hasCutEdge.data;
