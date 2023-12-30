import Providers from '@/components/Providers';
import { cn } from '@/utils/style';
import localFont from 'next/font/local';
import { ReactNode } from 'react';
import './globals.css';

const pretendard = localFont({
  src: '../fonts/PretendardStdVariable.woff2',
  variable: '--font-pretendard',
});

const tossface = localFont({
  src: '../fonts/TossFaceFontMac.ttf',
  variable: '--font-tossface',
  display: 'swap',
});

const RootLayout = ({ children }: { children: ReactNode }) => (
  <html
    lang="ko"
    className={cn(
      'text-sm dark lg:text-base',
      pretendard.className,
      tossface.variable,
      pretendard.variable
    )}
  >
    <body>
      <Providers>{children}</Providers>
    </body>
  </html>
);

export default RootLayout;
