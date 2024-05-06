export interface SwellError {
  errors: {
    name: {
      code: string;
      message: string;
    };
    email: {
      code: string;
      message: string;
    };
  };
}

export interface SwellResponse<T> {
  count: number;
  page_count: number;
  page: number;
  results: T[];
}
