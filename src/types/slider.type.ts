import { BaseResponse } from "./baseResponse.type";

export interface Slider {
  _id: string;
  image: string;
  title_ar?: string;
  title_en?: string;
  description_ar?: string;
  description_en?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface GetAllSlidersResponse extends BaseResponse {
  data: Slider[];
}

export interface GetSliderResponse extends BaseResponse {
  data: Slider;
}

export interface CreateSliderResponse extends BaseResponse {
  data: Slider;
}

export interface UpdateSliderResponse extends BaseResponse {
  data: Slider;
}


export interface DeleteSliderResponse extends BaseResponse {
  data: Slider 
}