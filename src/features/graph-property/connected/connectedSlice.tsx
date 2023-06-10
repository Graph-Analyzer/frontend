import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ResponderConnectedProjection } from '../../api/graphAnalyzerApi';
import { RootState } from '../../../store';

type ConnectedData = ResponderConnectedProjection | undefined;

interface ConnectedState {
  data: ConnectedData;
}

const initialState = {
  data: undefined,
} as ConnectedState;

export const connectedSlice = createSlice({
  name: 'connected',
  initialState,
  reducers: {
    updateConnectedData: (state, action: PayloadAction<ConnectedData>) => {
      state.data = action.payload;
    },
  },
});

export const { updateConnectedData } = connectedSlice.actions;

export default connectedSlice.reducer;

export const selectConnected = (state: RootState) => state.connected.data;
