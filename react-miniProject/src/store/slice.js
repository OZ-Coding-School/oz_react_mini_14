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

const logInSlice = createSlice({
  name: "logIn",
  initialState: {
    isLogIn: false,
  },
  reducers: {
    logInState: (state, action) => {
      state.isLogIn = action.payload;
    },
  },
});

export const { setSearchText } = searchSlice.actions;
export const { themeToggleState } = themeToggleSlice.actions;

export const { logInState } = logInSlice.actions;

//컴바인리듀스 사용
const rootReducer = combineReducers({
  search: searchSlice.reducer,
  themeToggle: themeToggleSlice.reducer,
  logIn: logInSlice.reducer,
});

export default rootReducer;
