import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { getItemFromLocalStorage } from "../../services/localStorageService";

export interface ThemeState {
  theme: string; //light or dark
  isDarkTheme: boolean;
}

const initialState: ThemeState = {
  theme: getItemFromLocalStorage<string>("theme") || "light",
  isDarkTheme: getItemFromLocalStorage<string>("theme") === "dark",
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<string>) => {
      state.theme = action.payload;
      state.isDarkTheme = action.payload === "dark";
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
