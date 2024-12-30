import { useMutation, useQueryClient } from '@tanstack/react-query';

interface MutationConfig<TData, TVariables> {
  mutationFn: (variables: TVariables) => Promise<TData>;
  onSuccess?: (data: TData, variables: TVariables) => void;
  invalidateQueries?: readonly (string | number | readonly (string | number)[])[];
}

export const createMutation = <TData, TVariables>(config: MutationConfig<TData, TVariables>) => {
  const queryClient = useQueryClient();

  return useMutation<TData, Error, TVariables>({
    mutationFn: config.mutationFn,
    onSuccess: (data, variables) => {
      config.onSuccess?.(data, variables);

      // 지정된 쿼리들 무효화
      config.invalidateQueries?.forEach(queryKey => {
        queryClient.invalidateQueries({
          queryKey,
        });
      });
    },
  });
};
