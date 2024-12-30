import { PropsWithChildren } from 'react';

import { ErrorBoundary } from 'react-error-boundary';

import { queryClient } from '@/app/providers/query/query-client';

import { QueryClientProvider } from './providers/query/QueryClientProvider';

export function App({ children }: PropsWithChildren) {
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <QueryClientProvider queryClient={queryClient}>{children}</QueryClientProvider>
    </ErrorBoundary>
  );
}
