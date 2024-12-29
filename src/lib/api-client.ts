import axios, { InternalAxiosRequestConfig } from 'axios';

import { useAuthStore } from '@/stores/useAuthStore';
import { env } from '@/utils/env';

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

apiClient.interceptors.response.use(
  (response: any) => response,
  async (error: { response: { status: number; }; }) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout()
    }
    return Promise.reject(error)
  }
)
