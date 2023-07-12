import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface WindowsMenuState {
  open: boolean;
}

const initialState: WindowsMenuState = {
  open: false,
};

export const windowsMenuSlice = createSlice({
  name: "windowsMenu",
  initialState,
  reducers: {
    toggleMenu: (state, action: PayloadAction<{ open: boolean }>) => {
      state.open = action.payload.open;
    },
  },
});

export const { toggleMenu } = windowsMenuSlice.actions;

export const selectWindowsMenuOpen = (state: RootState) => state.windowsMenu.open;

export default windowsMenuSlice.reducer;
