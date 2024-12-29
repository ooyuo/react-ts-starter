import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

import { env } from '@/shared/config/env';
import { useAuthStore } from '@/shared/stores/useAuthStore';

export const apiClient = axios.create({
  baseURL: env.apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 개발 환경에서만 요청/응답 로깅
if (env.isDev) {
  apiClient.interceptors.request.use((config: any) => {
    console.log('🚀 Request:', config)
    return config
  })

  apiClient.interceptors.response.use(
    (response: any) => {
      console.log('✅ Response:', response)
      return response
    },
    (error: any) => {
      console.log('❌ Error:', error)
      return Promise.reject(error)
    }
  )
}

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = useAuthStore.getState().token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// 에러 타입 정의
export type ApiError = AxiosError<{
  message: string;
  code: string;
}>;

// 응답 인터셉터 타입 강화
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: ApiError) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
    }
    return Promise.reject(error);
  }
);
