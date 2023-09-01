import { BaseResponse } from "./baseResponse.type";
export interface CreateGuest extends BaseResponse {
  data: {
    token: string;
  };
}
