import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "./baseurl";
import { GetAllSubCategoriesResponse } from "../types/subCategory.type";
export const subCategoryApi = createApi({
  reducerPath: "subCategoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/subcategories`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["subcategories"],
  endpoints: (builder) => ({
    getAllSubCategories: builder.query<
      GetAllSubCategoriesResponse,
      { query: string }
    >({
      query: ({ query = "" }) => `${query}`,
      providesTags: ["subcategories"],
    }),
  }),
});

export const { useGetAllSubCategoriesQuery } = subCategoryApi;
