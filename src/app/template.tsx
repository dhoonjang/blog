import { ReactNode } from 'react';

export default function Template({ children }: { children: ReactNode }) {
  return (
    <main className="container mx-auto min-h-screen px-2 md:px-4 lg:px-6">
      {children}
    </main>
  );
}
