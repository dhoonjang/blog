import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { createClient } from './utils/supabase/middleware';

export async function middleware(req: NextRequest) {
  const { supabase, response, subdomain } = createClient(req);

  const rewriteUrl = response.headers.get('x-middleware-rewrite');

  if (rewriteUrl && (subdomain === 'admin' || rewriteUrl?.includes('/admin'))) {
    const adminPathname = rewriteUrl.split('/admin').at(-1) ?? '';
    if (adminPathname.length > 1) {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user?.role !== 'authenticated') {
        return NextResponse.redirect(
          new URL(subdomain === 'admin' ? '/' : '/admin', req.url)
        );
      }
    }
  }

  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|images).*)'],
};
