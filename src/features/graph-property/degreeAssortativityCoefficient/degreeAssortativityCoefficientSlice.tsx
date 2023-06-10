import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ResponderDegreeAssortativityCoefficientProjection } from '../../api/graphAnalyzerApi';
import { RootState } from '../../../store';

type DegreeAssortativityCoefficientData =
  | ResponderDegreeAssortativityCoefficientProjection
  | undefined;

interface DegreeAssortativityCoefficientState {
  data: DegreeAssortativityCoefficientData;
}

const initialState = {
  data: undefined,
} as DegreeAssortativityCoefficientState;

export const degreeAssortativityCoefficientStateSlice = createSlice({
  name: 'degreeAssortativityCoefficient',
  initialState,
  reducers: {
    updateDegreeAssortativityCoefficientData: (
      state,
      action: PayloadAction<DegreeAssortativityCoefficientData>
    ) => {
      state.data = action.payload;
    },
  },
});

export const { updateDegreeAssortativityCoefficientData } =
  degreeAssortativityCoefficientStateSlice.actions;

export default degreeAssortativityCoefficientStateSlice.reducer;

export const selectDegreeAssortativityCoefficient = (state: RootState) =>
  state.degreeAssortativityCoefficient.data;
