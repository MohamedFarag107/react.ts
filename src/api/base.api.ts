import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "./baseurl"; 
export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/path`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
         headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: [""],
  endpoints: (builder) => ({
    queryName: builder.query({
      query: () => `/point`,
      providesTags: [""],
    }),
    mutationName: builder.mutation<any, {}>({
      query: ({}) => ({
        url: "pint",
        method: "POST",
      }),
      invalidatesTags: [""],
    }),
  }),
});

export const {} = categoryApi;
