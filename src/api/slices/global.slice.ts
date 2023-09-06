import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  logo: `/images/logo.png`,
  name_ar: `اكستريم`,
  name_en: `Xtreme`,
};
const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {},
});

export const globalReducer = globalSlice.reducer;
export const {} = globalSlice.actions;
