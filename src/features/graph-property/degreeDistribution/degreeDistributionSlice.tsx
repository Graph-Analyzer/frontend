import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ResponderDegreeDistributionProjection } from '../../api/graphAnalyzerApi';
import { RootState } from '../../../store';

type DegreeDistributionData = ResponderDegreeDistributionProjection | undefined;

interface DegreeDistributionState {
  data: DegreeDistributionData;
}

const initialState = {
  data: undefined,
} as DegreeDistributionState;

export const degreeDistributionSlice = createSlice({
  name: 'degreeDistribution',
  initialState,
  reducers: {
    updateDegreeDistributionData: (
      state,
      action: PayloadAction<DegreeDistributionData>
    ) => {
      state.data = action.payload;
    },
  },
});

export const { updateDegreeDistributionData } = degreeDistributionSlice.actions;

export default degreeDistributionSlice.reducer;

export const selectDegreeDistribution = (state: RootState) =>
  state.degreeDistribution.data;
