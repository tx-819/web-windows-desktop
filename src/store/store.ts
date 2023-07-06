import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "./counter/counterSlice";
import foldersReducer from "./folders/foldersSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    folders: foldersReducer,
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
