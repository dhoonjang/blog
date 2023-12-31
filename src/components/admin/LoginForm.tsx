'use client';

import { useRouter } from '@/navigation';
import { createClient } from '@/utils/supabase/client';
import { Button, Input } from '@nextui-org/react';
import { memo, useRef } from 'react';

const supabase = createClient();

const LoginForm = () => {
  const router = useRouter();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await supabase.auth.signInWithPassword({
      email: emailRef.current?.value ?? '',
      password: passwordRef.current?.value ?? '',
    });

    if (!response.data.user) {
      return alert('로그인에 실패했습니다.');
    }

    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 pt-10">
      <h1 className="text-2xl font-medium">인증</h1>
      <Input type="text" label="이메일" ref={emailRef} />
      <Input type="password" label="비밀번호" ref={passwordRef} />
      <Button type="submit" fullWidth color="primary">
        로그인
      </Button>
    </form>
  );
};

export default memo(LoginForm);
