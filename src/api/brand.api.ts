import {
  BaseQueryFn,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { baseUrl } from "./baseurl";
import {
  Brand,
  CreateBrandResponse,
  DeleteBrandResponse,
  GetAllBrandsResponse,
  GetBrandResponse,
  UpdateBrandResponse,
} from "../types/brand.type";
import { ApiError } from "../types/apiError.type";
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
  }) as BaseQueryFn<string | FetchArgs, unknown, ApiError, {}>,
  tagTypes: ["brand"],
  endpoints: (builder) => ({
    getAllBrands: builder.query<GetAllBrandsResponse, { query: string }>({
      query: ({ query = "" }) => `${query}`,
      providesTags: ["brand"],
    }),
    getBrand: builder.query<GetBrandResponse, { _id: string }>({
      query: ({ _id }) => `/${_id}`,
      providesTags: ["brand"],
    }),
    createBrand: builder.mutation<
      CreateBrandResponse,
      Omit<Brand, "createdAt" | "updatedAt" | "slug" | "_id">
    >({
      query: (body) => ({
        url: "",
        method: "POST",
        body,
      }),
      invalidatesTags: ["brand"],
    }),
    updateBrand: builder.mutation<
      UpdateBrandResponse,
      {
        _id: string;
        data: Partial<Omit<Brand, "createdAt" | "updatedAt" | "slug" | "_id">>;
      }
    >({
      query: ({ data, _id }) => ({
        url: `/${_id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["brand"],
    }),
    deleteBrand: builder.mutation<DeleteBrandResponse, { _id: string }>({
      query: ({ _id }) => ({
        url: `/${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["brand"],
    }),
  }),
});

export const {
  useGetAllBrandsQuery,
  useGetBrandQuery,
  useCreateBrandMutation,
  useUpdateBrandMutation,
  useDeleteBrandMutation,
} = brandApi;
