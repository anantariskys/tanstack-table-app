'use client';

import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { PropsWithChildren } from 'react';
import { SessionProvider } from 'next-auth/react';

export function Providers({ children }: PropsWithChildren) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <SessionProvider>
      <MantineProvider defaultColorScheme="light">
        <QueryClientProvider client={queryClient}>
          {children}
          <Notifications />
        </QueryClientProvider>
      </MantineProvider>
    </SessionProvider>
  );
}
