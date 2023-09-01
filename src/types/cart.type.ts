import { BaseResponse } from "./baseResponse.type";
import { Product } from "./product.type";
import { User } from "./user.type";

export interface Cart {
  product: string | Product;
  user: string | User;
  quantity: number;
}

export interface GetMyCartResponse extends BaseResponse {
  data: Cart[];
}
