import { getServerSession } from 'next-auth';
import { LoginButton } from '@/components/form';
import { authOptions } from '@/lib/auth';
import { cn } from '@/lib/style';

export default async function Home() {
  const session = await getServerSession(authOptions);

  console.log(session);

  return (
    <main className="container mx-auto flex min-h-screen flex-col justify-center p-24">
      <h1 className={cn('font-medium text-large text-left')}>dhoonjang</h1>
      <LoginButton />
    </main>
  );
}
