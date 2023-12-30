import Header from '@/components/Header';
import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: '동훈의 블로그',
  description: '장동훈이 잘 살아가기 위해 정리하는 생각들',
};

const BlogLayout = ({ children }: { children: ReactNode }) => (
  <div className="flex min-h-screen w-screen flex-col bg-background text-foreground">
    <Header />
    <main>{children}</main>
  </div>
);

export default BlogLayout;
