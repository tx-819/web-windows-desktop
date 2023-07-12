import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

const defaultModalSize = { width: 300, height: 150 };
const defaultModalPosition = { x: 300, y: 150 };

type Folder = {
  id: string;
  folderName: string;
  modalOpen?: boolean;
  isEdit?: boolean;
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
        isEdit: true,
        modalOpen: false,
        modalSize: defaultModalSize,
        modalPosition: defaultModalPosition,
      });
    },
    toggleEdit: (
      state,
      action: PayloadAction<{ id: string; isEdit: boolean }>
    ) => {
      const index = state.list.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.list[index] = {
          ...state.list[index],
          isEdit: action.payload.isEdit,
        };
      }
    },
    setFolderName: (
      state,
      action: PayloadAction<{ id: string; folderName: string }>
    ) => {
      const index = state.list.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.list[index] = {
          ...state.list[index],
          folderName: action.payload.folderName,
        };
      }
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

export const {
  addFolder,
  onOffFolderModal,
  setFolderModalStyle,
  setFolderName,
  toggleEdit
} = foldersSlice.actions;

export const selectFolders = (state: RootState) => state.folders.list;

export default foldersSlice.reducer;
