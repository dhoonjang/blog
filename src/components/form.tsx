'use client';

import { Button } from '@nextui-org/react';
import { signIn, signOut, useSession } from 'next-auth/react';

export const LoginButton = () => {
  const session = useSession();

  console.log(session);

  if (session.data) {
    return <Button onClick={() => signOut()}>Logout</Button>;
  }

  return (
    <Button
      color="primary"
      onClick={() => signIn('google')}
      isLoading={session.status === 'loading'}
    >
      Login
    </Button>
  );
};
