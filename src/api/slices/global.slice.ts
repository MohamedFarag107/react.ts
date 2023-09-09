import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  logo: `/images/logo.png`,
  name_ar: `اكستريم`,
  name_en: `Xtreme`,
  sliders: [
    "https://my-bucket-images.s3.us-east-1.amazonaws.com/1694246764907j2baoypzgb1678549721794.jpg",
    "https://my-bucket-images.s3.us-east-1.amazonaws.com/1694246775600d9l4rl9y9ak1678549728126.png",
    "https://my-bucket-images.s3.us-east-1.amazonaws.com/16942467870622y9ba5337w91678549734412.png",
  ],
};
const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {},
});

export const globalReducer = globalSlice.reducer;
export const {} = globalSlice.actions;
