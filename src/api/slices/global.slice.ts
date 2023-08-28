import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  logo: `https://firebasestorage.googleapis.com/v0/b/xtreme--store.appspot.com/o/xtreme%20store%20logo.png?alt=media&token=62ddcc7b-737f-491c-8c63-4cd09b67931f`,
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
