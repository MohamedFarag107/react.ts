import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "./baseurl";
import { CreateGuest } from "../types/auth.type";
import { GetMeResponse } from "../types/user.type";
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["user"],
  endpoints: (builder) => ({
    getMe: builder.query<GetMeResponse, {}>({
      query: () => `/auth/get-me`,
      providesTags: ["user"],
    }),
    createGuest: builder.mutation<CreateGuest, {}>({
      query: ({}) => ({
        url: "/auth/guest",
        method: "POST",
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const { useGetMeQuery, useCreateGuestMutation } = authApi;
