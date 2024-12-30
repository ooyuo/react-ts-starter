import { AxiosError } from 'axios';

import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { QueryClient } from '@tanstack/react-query';

const GC_TIME = 1000 * 60 * 30; // 30분

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 60, // 1분
      gcTime: GC_TIME,
      refetchOnWindowFocus: import.meta.env.PROD, // 프로덕션에서만 활성화
      throwOnError: error => {
        if (error instanceof AxiosError) {
          return error.response?.status !== 404;
        }
        return true;
      },
    },
    mutations: {
      retry: false,
      throwOnError: true,
    },
  },
});

// 영구 스토리지 설정
export const queryPersister = createSyncStoragePersister({
  storage: window.localStorage,
  key: 'REACT_QUERY_CACHE',
});
