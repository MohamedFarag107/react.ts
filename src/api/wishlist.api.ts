import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "./baseurl";
import { GetMyWishlistResponse } from "../types/wishlist.type";
export const wishlistApi = createApi({
  reducerPath: "wishlistApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/wishlist`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["wishlist"],
  endpoints: (builder) => ({
    getMyWishlist: builder.query<GetMyWishlistResponse, { query: string }>({
      query: ({ query = "" }) => `/me${query}`,
      providesTags: ["wishlist"],
    }),
  }),
});

export const { useGetMyWishlistQuery } = wishlistApi;
