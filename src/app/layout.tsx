import Header from '@/components/Header';
import Providers from '@/components/Providers';
import { cn } from '@/utils/style';
import type { Metadata } from 'next';
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

export const metadata: Metadata = {
  metadataBase: new URL('https://blog.dhoonjang.io'),
  title: '동훈의 블로그',
  description: '잘 살아가기 위해 정리하는 생각들',
  openGraph: {
    title: '동훈의 블로그',
    description: '잘 살아가기 위해 정리하는 생각들',
    siteName: '동훈의 블로그',
    images: [
      {
        url: `/api/og?title=${'잘 살아가기 위해 정리하는 생각들'}`,
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    title: '동훈의 블로그',
    description: '잘 살아가기 위해 정리하는 생각들',
    images: `/api/og?title=${'잘 살아가기 위해 정리하는 생각들'}`,
  },
};

const RootLayout = ({ children }: { children: ReactNode }) => (
  <html lang="ko" className="bg-background dark">
    <body
      className={cn(
        'flex w-screen flex-col text-base',
        pretendard.className,
        tossface.variable,
        pretendard.variable
      )}
    >
      <Providers>
        <Header title="동훈의 블로그" />
        <main className="container">{children}</main>
      </Providers>
    </body>
  </html>
);

export default RootLayout;
