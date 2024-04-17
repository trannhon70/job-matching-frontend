export type FormatResponse<T> = {
  status: string;
  code: number;
  data: T;
  message: string;
  option: null;
};

export interface FormatResponseJobList<T> {
  totalPage: number;
  data: T;
  totalItem: number;
  code: number;
}

export type FormatErrorResponse = {
  response: {
    data: ErrorData;
    status: number;
  };
};

export type ErrorData = {
  status: string;
  code: number;
  message: string;
  success: boolean;
};
