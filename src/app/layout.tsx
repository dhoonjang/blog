import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { ReactNode } from 'react';
import Providers from './providers';
import './globals.scss';

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
  title: 'dhoonjang blog',
  description: "dhoonjang's blog",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="ko"
      className={`${pretendard.className} ${pretendard.variable} ${tossface.variable}`}
    >
      <body className="dark">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
