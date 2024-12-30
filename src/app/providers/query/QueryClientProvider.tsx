import { PropsWithChildren } from 'react';

import { QueryClient, QueryClientProvider as TanstackQueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

interface Props extends PropsWithChildren {
  queryClient: QueryClient;
}

export function QueryClientProvider({ children, queryClient }: Props) {
  return (
    <TanstackQueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools />
    </TanstackQueryClientProvider>
  );
}
