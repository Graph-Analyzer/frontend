import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GenerateGeneratePostApiResponse } from '../api/graphGeneratorApi';
import { RootState } from '../../store';

type GeneratorData = GenerateGeneratePostApiResponse | undefined;

interface GeneratorState {
  data: GeneratorData;
}

const initialState = {
  data: undefined,
} as GeneratorState;

export const generatorSlice = createSlice({
  name: 'generator',
  initialState,
  reducers: {
    updateGeneratorData: (state, action: PayloadAction<GeneratorData>) => {
      state.data = action.payload;
    },
  },
});

export const { updateGeneratorData } = generatorSlice.actions;

export default generatorSlice.reducer;

export const selectGeneratorData = (state: RootState) => state.generator.data;
