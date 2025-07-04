export type ResponseType<T> = {
  data: T;
};

export type PaginatedResponseType<T> = {
  data: T[];
  meta: {
    page: number;
    totalPage: number;
    totalData: number;
  };
};

export type ErrorResponseType = {
  type: 'client_error' | 'server_error';
  errors: {
    code: string;
    detail: string;
    attr: string | null;
  }[];
  timestamp: string;
};
