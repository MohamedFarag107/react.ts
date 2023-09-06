import { BaseQueryFn, FetchArgs, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "./baseurl";
import { CreateSubCategoryResponse, DeleteSubCategoryResponse, GetAllSubCategoriesResponse, GetSubCategoryResponse, SubCategory, UpdateSubCategoryResponse } from "../types/subCategory.type";
import { ApiError } from "../types/apiError.type";
export const subCategoryApi = createApi({
  reducerPath: "subCategoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/subcategories`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }) as BaseQueryFn<string | FetchArgs, unknown, ApiError, {}>,
  tagTypes: ["subcategories"],
  endpoints: (builder) => ({
    getAllSubCategories: builder.query<
      GetAllSubCategoriesResponse,
      { query: string }
    >({
      query: ({ query = "" }) => `${query}`,
      providesTags: ["subcategories"],
    }),
    getSubCategory : builder.query<GetSubCategoryResponse, {_id: string}>({
      query: ({ _id }) => `/${_id}`,
      providesTags: ["subcategories"],
    }),
    createSubCategory: builder.mutation<CreateSubCategoryResponse, Omit<SubCategory, 'createdAt' | 'updatedAt' | "_id">>({
      query: ( body ) => ({
        url: "",
        method: "POST",
        body,
      }),
      invalidatesTags: ["subcategories"],
    }),
    updateSubCategory: builder.mutation<UpdateSubCategoryResponse, {_id: string, data: Partial<Omit<SubCategory, 'createdAt' | 'updatedAt'>> }>({
      query: ({ data ,_id}) => ({
        url: `/${_id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["subcategories"],
    }),
    deleteSubCategory: builder.mutation<DeleteSubCategoryResponse, {_id: string}>({
      query: ({ _id }) => ({
        url: `/${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["subcategories"],
    }),
  }),
});

export const { useGetAllSubCategoriesQuery,useGetSubCategoryQuery, useCreateSubCategoryMutation, useDeleteSubCategoryMutation, useUpdateSubCategoryMutation } = subCategoryApi;
