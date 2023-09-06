import { BaseResponse } from "./baseResponse.type";

export interface User {
  name?: string;
  email: string;
  password: string;
  passwordChangedAt: Date;
  role: Role;
}

export enum Role {
  USER = "user",
  ADMIN = "admin",
  GUEST = "guest",
}

export interface GetMeResponse extends BaseResponse {
  data: {
    email: string;
    role: Role;
    createdAt: string;
    updatedAt: string;
  };
}
