export const env = {
  apiUrl: import.meta.env.VITE_API_URL,
  isDev: import.meta.env.VITE_ENV === 'development',
  isProd: import.meta.env.VITE_ENV === 'production',
  appTitle: import.meta.env.VITE_APP_TITLE,
} as const
