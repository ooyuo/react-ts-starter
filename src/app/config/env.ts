export const env = {
  apiUrl: import.meta.env.VITE_API_URL,
  isDev: import.meta.env.DEV,
  // ... 다른 환경 변수들
} as const;
