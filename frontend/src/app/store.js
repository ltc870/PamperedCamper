import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import campgroundReducer from "../features/campgrounds/campgroundsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    campgrounds: campgroundReducer,
  },
});
