import { BaseResponse } from "./baseResponse.type";

export interface UploadResponse extends BaseResponse {
  data: {
    url: string;
  };
}
