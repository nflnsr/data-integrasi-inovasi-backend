import { AxiosError, AxiosResponse } from "axios";

type ResponseAPI<T = undefined> = AxiosResponse<{
  status: string;
  message: string;
  data?: T | null;
  pagination?: object | null;
}>;

type ErrorResponseAPI<T = undefined> = AxiosError<{
  status: string;
  message: string;
  data?: T | null;
  pagination?: object | null;
}>;

export type { ResponseAPI, ErrorResponseAPI };
