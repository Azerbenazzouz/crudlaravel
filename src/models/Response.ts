export type ResponseModel<T> = {
  status: boolean;
  code: number;
  message: string;
  data?: T;
  errors?: Record<string, string[]>;
  timestamp: string;
}
