import { BaseResponse } from "./baseResponse.type";

export interface Brand {
  _id: string;
  name_ar: string;
  name_en: string;
  image: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetAllBrandsResponse extends BaseResponse {
  data: Brand[];
}

export interface GetBrandResponse extends BaseResponse {
  data: Brand;
}

export interface CreateBrandResponse extends BaseResponse {
  data: Brand;
}

export interface UpdateBrandResponse extends BaseResponse {
  data: Brand;
}


export interface DeleteBrandResponse extends BaseResponse {
  data: Brand 
}