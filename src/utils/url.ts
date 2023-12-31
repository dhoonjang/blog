import type { UrlObject } from 'url';
type Url = string | UrlObject;

export const getValidSubdomain = (host?: string | null) => {
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

export const getDomainUrl = (url: Url): Url => {
  if (typeof window === 'undefined') return url;
  const subdomain = getValidSubdomain();
  if (subdomain) return url;
  if (typeof url === 'string')
    return `/${window.location.pathname.split('/')[1]}${url}`;
  return {
    ...url,
    pathname: `/${window.location.pathname.split('/')[1]}${url.pathname}`,
  };
};
