import Header from '@/components/Header';
import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: '동훈의 Admin',
  description: '잘 살아가기 위해 정리하는 생각들',
};

const AdminLayout = ({ children }: { children: ReactNode }) => (
  <div className="flex w-screen flex-col text-foreground">
    <Header title="Admin" />
    <main>{children}</main>
  </div>
);

export default AdminLayout;
