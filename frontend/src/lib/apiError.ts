import axios from 'axios';

export function getApiErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as any;
    const status = error.response?.status;

    // ASP.NET validation errors
    if (data?.errors) {
      const firstKey = Object.keys(data.errors)[0];
      if (firstKey && data.errors[firstKey]?.length) {
        return data.errors[firstKey][0];
      }
    }

    // ASP.NET problem details
    if (data?.title) return data.title;
    if (data?.message) return data.message;

    // HTTP status based fallback
    if (status === 401) return 'Unauthorized. Please login again.';
    if (status === 403) return 'Access denied.';
    if (status === 404) return 'Resource not found.';
    if (typeof status === 'number' && status >= 500)
      return 'Server error. Please try later.';
  }

  if (error instanceof Error) return error.message;

  return 'Something went wrong. Please try again.';
}
