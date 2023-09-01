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
