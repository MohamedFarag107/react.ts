import { BaseResponse } from "./baseResponse.type";

export interface Category {
  _id: string;
  name_ar: string;
  name_en: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetAllCategoriesResponse extends BaseResponse {
  data: Category[];
}

export interface GetCategoryResponse extends BaseResponse {
  data: Category;
}

export interface CreateCategoryResponse extends BaseResponse {
  data: Category;
}

export interface UpdateCategoryResponse extends BaseResponse {
  data: Category;
}


export interface DeleteCategoryResponse extends BaseResponse {
  data: Category 
}
