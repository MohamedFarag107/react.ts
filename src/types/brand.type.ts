import { BaseResponse } from "./baseResponse.type";

export interface Brand {
  name_ar: string;
  name_en: string;
  image: string;
  slug: string;
}

export interface GetAllBrandsResponse extends BaseResponse {
  data: Brand[];
}
