import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
export { default } from 'next-auth/middleware';

const PUBLIC_FILE = /\.(.*)$/; // Files

const getValidSubdomain = (host?: string | null) => {
  let subdomain: string | null = null;
  if (!host && typeof window !== 'undefined') {
    host = window.location.host;
  }
  if (host && host.includes('.')) {
    const candidate = host.split('.')[0];
    if (candidate && !candidate.includes('localhost') && candidate !== 'www') {
      subdomain = candidate;
    }
  }
  return subdomain;
};

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  if (PUBLIC_FILE.test(url.pathname) || url.pathname.includes('_next')) return;

  const host = req.headers.get('host');
  const subdomain = getValidSubdomain(host);

  if (subdomain) {
    url.pathname = `/${subdomain}${url.pathname}`;
  }

  return NextResponse.rewrite(url);
}
