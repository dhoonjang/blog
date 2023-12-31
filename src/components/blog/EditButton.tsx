import { createClient } from '@/utils/supabase/server';
import { Button } from '@nextui-org/react';
import { cookies } from 'next/headers';
import Link from 'next/link';

type EditButtonProps = {
  id: string;
};

const EditButton = async ({ id }: EditButtonProps) => {
  const supabase = createClient(cookies());
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user?.role !== 'authenticated') return null;
  return (
    <Link
      href={`https://admin.dhoonjang.io/posts/${id}`}
      target="_blank"
      className=""
    >
      <Button type="button" size="sm">
        편집
      </Button>
    </Link>
  );
};

export default EditButton;
