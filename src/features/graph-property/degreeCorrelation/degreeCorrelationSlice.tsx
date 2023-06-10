import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ResponderDegreeCorrelationProjection } from '../../api/graphAnalyzerApi';
import { RootState } from '../../../store';

type DegreeCorrelationData = ResponderDegreeCorrelationProjection | undefined;

interface DegreeCorrelationState {
  data: DegreeCorrelationData;
}

const initialState = {
  data: undefined,
} as DegreeCorrelationState;

export const degreeCorrelationSlice = createSlice({
  name: 'degreeCorrelation',
  initialState,
  reducers: {
    updateDegreeCorrelationData: (
      state,
      action: PayloadAction<DegreeCorrelationData>
    ) => {
      state.data = action.payload;
    },
  },
});

export const { updateDegreeCorrelationData } = degreeCorrelationSlice.actions;

export default degreeCorrelationSlice.reducer;

export const selectDegreeCorrelation = (state: RootState) => state.degreeCorrelation.data;
