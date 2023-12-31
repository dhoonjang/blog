import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { PropsWithChildren } from 'react';

const CheckAuth = async ({ children }: PropsWithChildren) => {
  const supabase = createClient(cookies());
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user?.role !== 'authenticated') return notFound();
  return <>{children}</>;
};

export default CheckAuth;
