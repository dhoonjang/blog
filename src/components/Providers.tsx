'use client';

import { useRouter } from '@/navigation';
import { NextUIProvider } from '@nextui-org/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FC, PropsWithChildren, useState } from 'react';

const Providers: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 2 * 1000,
          },
        },
      })
  );

  return (
    <NextUIProvider navigate={router.push}>
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    </NextUIProvider>
  );
};

export default Providers;
