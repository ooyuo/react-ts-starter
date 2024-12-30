import axios from 'axios';

import { queryClient } from '@/app/providers/query/query-client';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
});

api.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 401) {
      queryClient.clear();
      // 로그아웃 처리
    }
    return Promise.reject(error);
  }
);
