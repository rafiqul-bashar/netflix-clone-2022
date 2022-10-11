import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import userSlice from "./userSlice";
const initialState = {
  user: [],
};
const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});
export const store = configureStore({
  initialState,
  reducer: {
    users: userSlice,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
