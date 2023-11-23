interface ErrorResponse {
  code: number;
  description: string;
}

export const responseGenerate = (
  success: boolean = true,
  message: string = '',
  data: object | null = null,
  error: ErrorResponse | null = null,
) => {
  const response: {
    error: ErrorResponse;
    success: boolean;
    message: string;
  } = {
    success,
    message,
  };

  if (data !== null && error === null) {
    response.data = data;
  } else if (error !== null) {
    response.error = error;
  }

  return response;
};
