import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "./baseurl";
import { GetAllProductsResponse } from "../types/product.type";
export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/products`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["product"],
  endpoints: (builder) => ({
    getAllProducts: builder.mutation<GetAllProductsResponse, { query: string }>(
      {
        query: ({ query }) => ({
          url: `${query}`,
          method: "GET",
        }),
        invalidatesTags: ["product"],
      }
    ),
  }),
});

export const { useGetAllProductsMutation } = productApi;
