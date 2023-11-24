export const responseGenerate = (
  success: boolean,
  message: string,
  data: object | string | null = null,
  error: object | string | null = null,
) => {
  let response;
  if (data !== null && error === null) {
    response = {
      success,
      message,
      data,
    };
    return response;
  } else if (error !== null && data === null) {
    response = {
      success,
      message,
      error,
    };
  }
  return response;
};
