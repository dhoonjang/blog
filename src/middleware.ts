import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { createClient } from './utils/supabase/middleware';

export async function middleware(req: NextRequest) {
  const { supabase, response, subdomain } = createClient(req);

  if (subdomain === 'admin' || response.url.includes('/admin')) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user?.role !== 'authenticated') return NextResponse.error();
  }

  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|images).*)'],
};
