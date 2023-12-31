import { NavigateOptions } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import NextLink, { LinkProps } from 'next/link';
import { useRouter as useNextRouter } from 'next/navigation';
import {
  AnchorHTMLAttributes,
  ForwardRefExoticComponent,
  forwardRef,
} from 'react';
import { getDomainUrl } from './utils/url';

export const Link: ForwardRefExoticComponent<
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> &
    LinkProps & {
      children?: React.ReactNode;
    } & React.RefAttributes<HTMLAnchorElement>
> = forwardRef(({ href, children, ...props }, ref) => (
  <NextLink href={getDomainUrl(href)} {...props} ref={ref}>
    {children}
  </NextLink>
));

Link.displayName = 'Link';

export const useRouter = () => {
  const { push, replace, ...rest } = useNextRouter();
  return {
    ...rest,
    push: (href: string, options?: NavigateOptions) =>
      push(getDomainUrl(href) as string, options),
    replace: (href: string, options?: NavigateOptions) =>
      replace(getDomainUrl(href) as string, options),
  };
};
