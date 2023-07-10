import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

const defaultModalSize = { width: 300, height: 150 };
const defaultModalPosition = { x: 300, y: 150 };

type Folder = {
  id: string;
  folderName: string;
  modalOpen: boolean;
  modalSize?: { width: number; height: number };
  modalPosition?: { x: number; y: number };
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
      state.list.push({
        ...action.payload,
        modalSize: defaultModalSize,
        modalPosition: defaultModalPosition,
      });
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
    setFolderModalStyle: (
      state,
      action: PayloadAction<{
        id: string;
        modalSize: { width: number; height: number };
        modalPosition?: { x: number; y: number };
      }>
    ) => {
      const { id, modalSize, modalPosition } = action.payload;
      const index = state.list.findIndex((item) => item.id === id);
      if (index !== -1) {
        state.list[index] = {
          ...state.list[index],
          modalSize,
          modalPosition: modalPosition
            ? modalPosition
            : state.list[index].modalPosition,
        };
      }
    },
  },
});

export const { addFolder, onOffFolderModal, setFolderModalStyle } =
  foldersSlice.actions;

export const selectFolders = (state: RootState) => state.folders.list;

export default foldersSlice.reducer;
