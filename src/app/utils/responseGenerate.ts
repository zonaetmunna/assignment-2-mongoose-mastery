export const responseGenerate = (
  success: boolean = true,
  message: string = '',
  data: unknown | null = null,
  // error: { code: number; description: string } | null = null,
  error: string = '',
) => {
  return {
    success,
    message,
    data,
    error,
  };
};
