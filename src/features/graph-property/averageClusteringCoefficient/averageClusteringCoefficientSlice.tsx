import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ResponderAverageClusteringCoefficientProjection } from '../../api/graphAnalyzerApi';
import { RootState } from '../../../store';

type AverageClusteringCoefficientData =
  | ResponderAverageClusteringCoefficientProjection
  | undefined;

interface AverageClusteringCoefficientState {
  data: AverageClusteringCoefficientData;
}

const initialState = {
  data: undefined,
} as AverageClusteringCoefficientState;

export const averageClusteringCoefficientSlice = createSlice({
  name: 'averageClusteringCoefficient',
  initialState,
  reducers: {
    updateAverageClusteringCoefficientData: (
      state,
      action: PayloadAction<AverageClusteringCoefficientData>
    ) => {
      state.data = action.payload;
    },
  },
});

export const { updateAverageClusteringCoefficientData } =
  averageClusteringCoefficientSlice.actions;

export default averageClusteringCoefficientSlice.reducer;

export const selectAverageClusteringCoefficient = (state: RootState) =>
  state.averageClusteringCoefficient.data;
