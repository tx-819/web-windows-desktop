import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type Folder = {
  id: string;
  folderName: string;
  modalOpen: boolean;
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
    onOffFolderModal: (state, action: PayloadAction<{id: string, modalOpen: boolean}>) => {
      const currentFolder = state.list.find(
        (item) => item.id === action.payload.id
      );
      if (currentFolder)
        state.list = [
          ...state.list.filter((item) => item.id !== action.payload.id),
          { ...currentFolder, modalOpen: action.payload.modalOpen },
        ];
    },
  },
});

export const { addFolder, onOffFolderModal } = foldersSlice.actions;

export const selectFolders = (state: RootState) => state.folders.list;

export default foldersSlice.reducer;
