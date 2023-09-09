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
      query: ({ query = "" }) => `/me${query}`,
      providesTags: ["cart"],
    }),
    toggleCart: builder.mutation<void, { product: string; quantity: number }>({
      query: ({ product, quantity }) => ({
        url: `/toggle`,
        body: { product, quantity },
        method: "POST",
      }),
      invalidatesTags: ["cart"],
    }),
    updateQuantity: builder.mutation<void, { _id: string; quantity: number }>({
      query: ({ _id, quantity }) => ({
        url: `/${_id}`,
        body: { quantity },
        method: "PUT",
      }),
      invalidatesTags: ["cart"],
    }),
  }),
});

export const {
  useGetMyCartQuery,
  useUpdateQuantityMutation,
  useToggleCartMutation,
} = cartApi;
