import { combineReducers, createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    text: "",
  },
  reducers: {
    setSearchText: (state, action) => {
      state.text = action.payload;
    },
  },
});

const themeToggleSlice = createSlice({
  name: "themeToggle",
  initialState: {
    isDarkMode: false,
  },
  reducers: {
    themeToggleState: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
  },
});

export const { setSearchText } = searchSlice.actions;
export const { themeToggleState } = themeToggleSlice.actions;

//컴바인리듀스 사용
const rootReducer = combineReducers({
  search: searchSlice.reducer,
  themeToggle: themeToggleSlice.reducer,
});

export default rootReducer;
