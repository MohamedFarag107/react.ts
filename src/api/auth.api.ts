import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "./baseurl";
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("authentication", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["user"],
  endpoints: (builder) => ({
    getMe: builder.query({
      query: () => `/auth/get-me`,
      providesTags: ["user"],
    }),
    createGuest: builder.mutation({
      query: () => ({
        url: "/auth/guest",
        method: "POST",
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const { useGetMeQuery, useCreateGuestMutation } = authApi;
