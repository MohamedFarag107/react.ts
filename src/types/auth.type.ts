export interface CreateGuest {
  statusCode: number;
  name: string;
  message: string;
  data: {
    token: string;
  };
}
