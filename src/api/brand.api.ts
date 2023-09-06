import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "./baseurl";
import { GetAllBrandsResponse } from "../types/brand.type";
export const brandApi = createApi({
  reducerPath: "brandApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/brands`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["brand"],
  endpoints: (builder) => ({
    getAllBrands: builder.query<GetAllBrandsResponse, { query: string }>({
      query: ({ query = "" }) => `${query}`,
      providesTags: ["brand"],
    }),
  }),
});

export const { useGetAllBrandsQuery } = brandApi;
