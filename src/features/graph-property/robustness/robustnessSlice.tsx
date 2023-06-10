import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ResponderRobustnessProjection } from '../../api/graphAnalyzerApi';
import { RootState } from '../../../store';

type RobustnessData = ResponderRobustnessProjection | undefined;

interface RobustnessState {
  data: RobustnessData;
}

const initialState = {
  data: undefined,
} as RobustnessState;

export const robustnessSlice = createSlice({
  name: 'robustness',
  initialState,
  reducers: {
    updateRobustnessData: (state, action: PayloadAction<RobustnessData>) => {
      state.data = action.payload;
    },
  },
});

export const { updateRobustnessData } = robustnessSlice.actions;

export default robustnessSlice.reducer;

export const selectRobustness = (state: RootState) => state.robustness.data;
