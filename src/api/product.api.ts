import {
  BaseQueryFn,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { baseUrl } from "./baseurl";
import { GetAllProductsResponse } from "../types/product.type";
import { ApiError } from "../types/apiError.type";
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
  }) as BaseQueryFn<string | FetchArgs, unknown, ApiError, {}>,
  tagTypes: ["product"],
  endpoints: (builder) => ({
    getAllProducts: builder.query<GetAllProductsResponse, { query: string }>({
      query: ({ query }) => `${query}`,
      providesTags: ["product"],
    }),
    deleteProduct: builder.mutation<void, { id: string }>({
      query: ({ id }) => ({ url: `/${id}`, method: "DELETE" }),
      invalidatesTags: ["product"],
    }),
  }),
});

export const { useGetAllProductsQuery, useDeleteProductMutation } = productApi;
