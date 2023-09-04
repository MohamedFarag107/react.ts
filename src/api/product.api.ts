import {
  BaseQueryFn,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { baseUrl } from "./baseurl";
import {
  CreateProductResponse,
  GetAllProductsResponse,
  GetProductByIdResponse,
  Product,
  UpdateProductResponse,
} from "../types/product.type";
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
    getProductById: builder.query<
      GetProductByIdResponse,
      { query: string; _id: string }
    >({
      query: ({ query, _id }) => `/${_id}${query}`,
      providesTags: ["product"],
    }),
    deleteProduct: builder.mutation<void, { id: string }>({
      query: ({ id }) => ({ url: `/${id}`, method: "DELETE" }),
      invalidatesTags: ["product"],
    }),
    createProduct: builder.mutation<
      CreateProductResponse,
      Omit<Product, "rating" | "sold" | "piecesSold" | "_id">
    >({
      query: (body) => ({
        url: "",
        body,
        method: "POST",
      }),
      invalidatesTags: ["product"],
    }),
    updateProduct: builder.mutation<
      UpdateProductResponse,
      {
        _id: string;
        body: Omit<Product, "rating" | "sold" | "piecesSold" | "_id">;
      }
    >({
      query: ({ body, _id }) => ({
        url: `/${_id}`,
        body,
        method: "PUT",
      }),
      invalidatesTags: ["product"],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useCreateProductMutation,
} = productApi;
