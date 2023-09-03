import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "./baseurl";
import { GetAllCategoriesResponse } from "../types/category.type";
export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/categories`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
         headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["category"],
  endpoints: (builder) => ({
    getAllCategories: builder.query<
      GetAllCategoriesResponse,
      { query: string }
    >({
      query: ({ query = "" }) => `${query}`,
      providesTags: ["category"],
    }),
  }),
});

export const { useGetAllCategoriesQuery } = categoryApi;
