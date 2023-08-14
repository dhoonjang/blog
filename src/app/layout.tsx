import localFont from 'next/font/local';
import { ReactNode } from 'react';
import Providers from './providers';
import type { Metadata } from 'next';
import './globals.scss';

const pretendard = localFont({
  src: '../fonts/PretendardStdVariable.woff2',
  variable: '--font-pretendard',
});

export const metadata: Metadata = {
  title: 'dhoonjang nextjs template',
  description: 'template for nextjs project',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko" className={pretendard.className}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
