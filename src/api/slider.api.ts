import {
  BaseQueryFn,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { baseUrl } from "./baseurl";
import { ApiError } from "../types/apiError.type";
import {
  CreateSliderResponse,
  DeleteSliderResponse,
  GetAllSlidersResponse,
  GetSliderResponse,
  Slider,
  UpdateSliderResponse,
} from "../types/slider.type";
export const sliderApi = createApi({
  reducerPath: "sliderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/sliders`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }) as BaseQueryFn<string | FetchArgs, unknown, ApiError, {}>,
  tagTypes: ["slider"],
  endpoints: (builder) => ({
    getAllSliders: builder.query<
      GetAllSlidersResponse,
      {
        query: string;
      }
    >({
      query: ({ query }) => `${query}`,
      providesTags: ["slider"],
    }),
    createSlider: builder.mutation<
      CreateSliderResponse,
      Omit<Slider, "_id" | "createdAt" | "updatedAt">
    >({
      query: (body) => ({
        url: "",
        method: "POST",
        body,
      }),
      invalidatesTags: ["slider"],
    }),
    getSliderById: builder.query<
      GetSliderResponse,
      { query: string; _id: string }
    >({
      query: ({ query, _id }) => `/${_id}${query}`,
      providesTags: ["slider"],
    }),
    deleteSlider: builder.mutation<DeleteSliderResponse, { _id: string }>({
      query: ({ _id }) => ({ url: `/${_id}`, method: "DELETE" }),
      invalidatesTags: ["slider"],
    }),
    updateSlider: builder.mutation<
      UpdateSliderResponse,
      {
        _id: string;
        body: Omit<Slider, "_id" | "createdAt" | "updatedAt">;
      }
    >({
      query: ({ body, _id }) => ({
        url: `/${_id}`,
        body,
        method: "PUT",
      }),
      invalidatesTags: ["slider"],
    }),
  }),
});

export const {
  useGetAllSlidersQuery,
  useCreateSliderMutation,
  useGetSliderByIdQuery,
  useDeleteSliderMutation,
  useUpdateSliderMutation,
} = sliderApi;
