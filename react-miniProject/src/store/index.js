import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./searchSlice";

export const store = configureStore({
  reducer: {
    search: searchReducer,
  },
});

//컴바인 윗드스
