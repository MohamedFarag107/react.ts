import { BaseResponse } from "./baseResponse.type";
import { Product } from "./product.type";
import { User } from "./user.type";

export interface Wishlist {
  product: string | Product;
  user: string | User;
}

export interface GetMyWishlistResponse extends BaseResponse {
  data: Wishlist[];
}
