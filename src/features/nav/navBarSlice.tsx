import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';

const enum Mode {
  Offline = 'offline',
  Online = 'online',
}

interface NavBarState {
  currentMode: Mode;
}

const initialState = {
  currentMode: Mode.Online,
} as NavBarState;

export const navBarSlice = createSlice({
  name: 'navBar',
  initialState,
  reducers: {
    changeModeToOffline: (state) => {
      state.currentMode = Mode.Offline;
    },
  },
});

export const { changeModeToOffline } = navBarSlice.actions;

export default navBarSlice.reducer;

export const checkIsOffline = (state: RootState) =>
  state.navBar.currentMode === Mode.Offline;
