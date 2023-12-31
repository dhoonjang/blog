import Header from '@/components/Header';
import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
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

const BlogLayout = ({ children }: { children: ReactNode }) => (
  <div className="flex w-screen flex-col text-foreground">
    <Header title="동훈의 블로그" />
    <main>{children}</main>
  </div>
);

export default BlogLayout;
