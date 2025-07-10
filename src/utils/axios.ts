import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.response.use(
  (response) => {
    console.log('testttttttttttttttttttt');
    return response;
  },
  (error) => {
    if (
      error.response &&
      error.response.data &&
      error.response.data.errors &&
      Array.isArray(error.response.data.errors)
    ) {
      const messages = error.response.data.errors.map((err: { detail: string }) => err.detail);

      error.message = messages.join(', ');
    }

    return Promise.reject(error);
  },
);
