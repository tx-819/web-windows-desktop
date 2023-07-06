import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type Folder = {
  id: string;
  folderName: string;
  modalOpen: boolean;
  modalSize?: { width: number; height: number };
};

export interface FoldersState {
  list: Folder[];
}

const initialState: FoldersState = {
  list: [],
};

export const foldersSlice = createSlice({
  name: "folders",
  initialState,
  reducers: {
    addFolder: (state, action: PayloadAction<Folder>) => {
      state.list.push(action.payload);
    },
    onOffFolderModal: (
      state,
      action: PayloadAction<{ id: string; modalOpen: boolean }>
    ) => {
      const index = state.list.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.list[index] = {
          ...state.list[index],
          modalOpen: action.payload.modalOpen,
        };
      }
    },
    setFolderModalSize: (
      state,
      action: PayloadAction<{ id: string; width: number; height: number }>
    ) => {
      const index = state.list.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.list[index] = {
          ...state.list[index],
          modalSize: {
            width: action.payload.width,
            height: action.payload.height,
          },
        };
      }
    },
  },
});

export const { addFolder, onOffFolderModal, setFolderModalSize } =
  foldersSlice.actions;

export const selectFolders = (state: RootState) => state.folders.list;

export default foldersSlice.reducer;
