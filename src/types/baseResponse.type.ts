export interface BaseResponse {
  statusCode: number;
  name: string;
  message: string;
  pagination?: {
    length: number;
    totalPages: number;
    page: number;
    limit: number;
  };
}
