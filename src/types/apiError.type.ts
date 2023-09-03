export interface ApiError {
  data: {
    statusCode: number;
    name: string;
    message: string;
  };
}
