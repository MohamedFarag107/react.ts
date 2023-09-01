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
