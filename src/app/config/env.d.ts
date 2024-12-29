declare module '@/app/config/env' {
  export interface Env {
    apiUrl: string;
    isDev: boolean;
    // ... 다른 환경 변수들
  }

  export const env: Env;
}
