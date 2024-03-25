import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { paintSlice } from "./features/paintSlice";
import { DragDropSlice } from "./features/dragdropSlice";
import { AddOrderSlice } from "./features/addOrderSlice";

// slices
const rootReducer = combineSlices(
    paintSlice, DragDropSlice, AddOrderSlice
);

export type RootState = ReturnType<typeof rootReducer>;

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;