import { BaseResponse } from "./baseResponse.type";
import { Category } from "./category.type";

export interface SubCategory {
  _id: string;
  name_ar: string;
  name_en: string;
  image?: string;
  category: string | Category;
}
export interface GetAllSubCategoriesResponse extends BaseResponse {
  data: SubCategory[];
}

export interface CreateSubCategoryResponse extends BaseResponse {
  data: SubCategory;
}

export interface GetSubCategoryResponse extends BaseResponse {
  data: SubCategory;
}

export interface UpdateSubCategoryResponse extends BaseResponse {
  data: SubCategory;
}


export interface DeleteSubCategoryResponse extends BaseResponse {
  data: SubCategory 
}
