'use client';

import { NextUIProvider } from '@nextui-org/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
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
