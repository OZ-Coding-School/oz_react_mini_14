import { combineReducers, createSlice } from "@reduxjs/toolkit";
import { USER_INFO_KEY } from "@supabase_path";

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
    // 초기값 설정이 중요함. 새로고침 시 초기값이 고정될 수 있음.
    isLogIn: !!localStorage.getItem(USER_INFO_KEY.customKey), //!!는 Boolean 타입으로 변환
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
