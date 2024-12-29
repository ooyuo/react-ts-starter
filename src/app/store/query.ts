import { create } from 'zustand';

import { queryClient } from '@/app/providers/query/query-client';

interface QueryStore {
  invalidateQueries: (queryKey: string[]) => Promise<void>;
  prefetchQuery: <T>(queryKey: string[], fn: () => Promise<T>) => Promise<void>;
}

export const useQueryStore = create<QueryStore>((set) => ({
  invalidateQueries: async (queryKey) => {
    await queryClient.invalidateQueries({ queryKey });
  },
  prefetchQuery: async (queryKey, fn) => {
    await queryClient.prefetchQuery({
      queryKey,
      queryFn: fn,
    });
  },
}));
