import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { authApi } from "./auth.api";
import { globalReducer } from "./slices";
import { categoryApi } from "./category.api";
import { cartApi } from "./cart.api";
import { wishlistApi } from "./wishlist.api";
import { brandApi } from "./brand.api";
import { productApi } from "./product.api";
import { uploadApi } from "./upload.api";
import { subCategoryApi } from "./subCategory.api";
import { sliderApi } from "./slider.api";

const createStore = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [wishlistApi.reducerPath]: wishlistApi.reducer,
    [brandApi.reducerPath]: brandApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [uploadApi.reducerPath]: uploadApi.reducer,
    [subCategoryApi.reducerPath]: subCategoryApi.reducer,
    [brandApi.reducerPath]: brandApi.reducer,
    [sliderApi.reducerPath]: sliderApi.reducer,
    global: globalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      categoryApi.middleware,
      cartApi.middleware,
      wishlistApi.middleware,
      brandApi.middleware,
      productApi.middleware,
      uploadApi.middleware,
      subCategoryApi.middleware,
      brandApi.middleware,
      sliderApi.middleware 
    ),
});

export const store = createStore;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
