import {
  BaseQueryFn,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { baseUrl } from "./baseurl";
import {
  Category,
  CreateCategoryResponse,
  DeleteCategoryResponse,
  GetAllCategoriesResponse,
  GetCategoryResponse,
  UpdateCategoryResponse,
} from "../types/category.type";
import { ApiError } from "../types/apiError.type";
export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/categories`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }) as BaseQueryFn<string | FetchArgs, unknown, ApiError, {}>,
  tagTypes: ["category"],
  endpoints: (builder) => ({
    getAllCategories: builder.query<
      GetAllCategoriesResponse,
      { query: string }
    >({
      query: ({ query = "" }) => `${query}`,
      providesTags: ["category"],
    }),
    getCategory: builder.query<GetCategoryResponse, { _id: string }>({
      query: ({ _id }) => `/${_id}`,
      providesTags: ["category"],
    }),
    createCategory: builder.mutation<
      CreateCategoryResponse,
      Omit<Category, "createdAt" | "updatedAt" | "_id">
    >({
      query: (body) => ({
        url: "",
        method: "POST",
        body,
      }),
      invalidatesTags: ["category"],
    }),
    updateCategory: builder.mutation<
      UpdateCategoryResponse,
      {
        _id: string;
        data: Partial<Omit<Category, "createdAt" | "updatedAt" | "_id">>;
      }
    >({
      query: ({ data, _id }) => ({
        url: `/${_id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["category"],
    }),
    deleteCategory: builder.mutation<DeleteCategoryResponse, { _id: string }>({
      query: ({ _id }) => ({
        url: `/${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["category"],
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useGetCategoryQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
