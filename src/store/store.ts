import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "./counter/counterSlice";
import foldersReducer from "./folders/foldersSlice";
import windowsReducer from "./windowsMenu/windowsMenuSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    folders: foldersReducer,
    windowsMenu: windowsReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
