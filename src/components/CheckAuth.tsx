import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { PropsWithChildren, ReactNode } from 'react';

const CheckAuth = async ({
  children,
  fallback,
}: PropsWithChildren<{
  fallback?: ReactNode;
}>) => {
  const supabase = createClient(cookies());

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user?.role !== 'authenticated')
    return !!fallback ? <>{fallback}</> : notFound();
  return <>{children}</>;
};

export default CheckAuth;
