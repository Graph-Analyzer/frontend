import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ResponderGeneralInformationProjection } from '../../api/graphAnalyzerApi';
import { RootState } from '../../../store';

type GeneralInformationData = ResponderGeneralInformationProjection | undefined;

interface GeneralInformationState {
  data: GeneralInformationData;
}

const initialState = {
  data: undefined,
} as GeneralInformationState;

export const generalInformationSlice = createSlice({
  name: 'generalInformation',
  initialState,
  reducers: {
    updateGeneralInformationData: (
      state,
      action: PayloadAction<GeneralInformationData>
    ) => {
      state.data = action.payload;
    },
  },
});

export const { updateGeneralInformationData } = generalInformationSlice.actions;

export default generalInformationSlice.reducer;

export const selectGeneralInformation = (state: RootState) =>
  state.generalInformation.data;
