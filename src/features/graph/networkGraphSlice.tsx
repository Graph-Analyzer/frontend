import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ResponderFullGraphProjection } from '../api/graphAnalyzerApi';
import { RootState } from '../../store';

type NetworkGraphData = ResponderFullGraphProjection | undefined;

interface NetworkGraphState {
  data: NetworkGraphData;
}

const initialState = {
  data: undefined,
} as NetworkGraphState;

export const networkGraphSlice = createSlice({
  name: 'networkGraph',
  initialState,
  reducers: {
    updateNetworkGraphData: (state, action: PayloadAction<NetworkGraphData>) => {
      state.data = action.payload;
    },
  },
});

export const { updateNetworkGraphData } = networkGraphSlice.actions;

export default networkGraphSlice.reducer;

export const selectNetworkGraph = (state: RootState) => state.networkGraph.data;
