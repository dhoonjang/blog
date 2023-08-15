import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Session } from 'next-auth';
import { ReactNode } from 'react';
import Providers from './providers';
import './globals.scss';

const pretendard = localFont({
  src: '../fonts/PretendardStdVariable.woff2',
  variable: '--font-pretendard',
});

export const metadata: Metadata = {
  title: 'dhoonjang blog',
  description: "dhoonjang's blog",
};

export default function RootLayout({
  children,
  session,
}: {
  children: ReactNode;
  session: Session | null;
}) {
  return (
    <html lang="ko" className={pretendard.className}>
      <body>
        <Providers session={session}>{children}</Providers>
      </body>
    </html>
  );
}
