import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ResponderDensityProjection } from '../../api/graphAnalyzerApi';
import { RootState } from '../../../store';

type DensityData = ResponderDensityProjection | undefined;

interface DensityState {
  data: DensityData;
}

const initialState = {
  data: undefined,
} as DensityState;

export const densitySlice = createSlice({
  name: 'density',
  initialState,
  reducers: {
    updateDensityData: (state, action: PayloadAction<DensityData>) => {
      state.data = action.payload;
    },
  },
});

export const { updateDensityData } = densitySlice.actions;

export default densitySlice.reducer;

export const selectDensity = (state: RootState) => state.density.data;
