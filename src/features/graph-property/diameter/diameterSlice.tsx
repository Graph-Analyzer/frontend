import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ResponderDiameterProjection } from '../../api/graphAnalyzerApi';
import { RootState } from '../../../store';

type DiameterData = ResponderDiameterProjection | undefined;

interface DiameterState {
  data: DiameterData;
}

const initialState = {
  data: undefined,
} as DiameterState;

export const diameterSlice = createSlice({
  name: 'diameter',
  initialState,
  reducers: {
    updateDiameterData: (state, action: PayloadAction<DiameterData>) => {
      state.data = action.payload;
    },
  },
});

export const { updateDiameterData } = diameterSlice.actions;

export default diameterSlice.reducer;

export const selectDiameter = (state: RootState) => state.diameter.data;
