import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "./baseurl";
import { GetMyCartResponse } from "../types/cart.type";
export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/cart`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
         headers.set("Authorization", `Bearer ${token}`);
      }
       
      return headers;
    },
  }),
  tagTypes: ["cart"],
  endpoints: (builder) => ({
    getMyCart: builder.query<GetMyCartResponse, { query: string }>({
      query: ({ query = "" }) => `/${query}`,
      providesTags: ["cart"],
    }),
  }),
});

export const { useGetMyCartQuery } = cartApi;
