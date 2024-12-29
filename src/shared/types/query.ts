export type QueryConfig<TData, TError> = {
  staleTime?: number;
  cacheTime?: number;
  retry?: boolean | number;
  onSuccess?: (data: TData) => void;
  onError?: (error: TError) => void;
};
