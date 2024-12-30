import { useEffect, useMemo, useRef } from 'react';

import { QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query';

import { useDebounce } from '../hooks/useDebounce';

interface ParamConfig {
  key: string;
  paramKey?: string;
}

interface UseListQueryConfig<TData, TError = unknown> {
  queryKey: QueryKey;
  storeName?: 'main' | 'modal';
  fetchFn: (queryString: string) => Promise<TData>;
  paramConfigs?: ParamConfig[];
  debounced?: boolean;
  debounceTime?: number;
  select?: (data: TData) => TData;
  options?: Omit<UseQueryOptions<TData, TError, TData>, 'queryKey' | 'queryFn' | 'select'>;
}

export const useListQuery = <TData, TError = unknown>({
  queryKey,
  fetchFn,
  paramConfigs = [],
  debounced = false,
  debounceTime = 300,
  select,
  options = {},
}: UseListQueryConfig<TData, TError>) => {
  const debouncedFetchRef = useRef(debounced ? useDebounce(fetchFn, debounceTime) : fetchFn);

  const queryString = useMemo(() => {
    const queryParams = new URLSearchParams();
    paramConfigs.forEach(({ key, paramKey }) => {
      const value = key === 'search' ? '' : null;
      if (value) {
        queryParams.set(paramKey || key, value);
      }
    });
    return queryParams.toString();
  }, [paramConfigs]);

  const query = useQuery({
    ...options,
    queryKey: [...queryKey, queryString],
    queryFn: () => debouncedFetchRef.current(queryString),
    select,
  });

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Query Dependencies Changed:', { queryString });
    }
  }, [queryString]);

  return query;
};
