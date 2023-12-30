import { Database } from '@/types/supabase';
import { createServerClient } from '@supabase/ssr';
import type { cookies as nextCookies } from 'next/headers';

export const createClient = (cookies?: ReturnType<typeof nextCookies>) =>
  createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name) => cookies?.get(name)?.value,
        set: (name, value) => {
          cookies?.set(name, value);
        },
      },
    }
  );
