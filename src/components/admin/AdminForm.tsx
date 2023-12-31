'use client';

import { useRouter } from '@/navigation';
import { createClient } from '@/utils/supabase/client';
import { Button } from '@nextui-org/react';

const supabase = createClient();

const AdminForm = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-4">
      <Button
        fullWidth
        type="button"
        onClick={() => {
          supabase.auth.signOut();
          router.refresh();
        }}
      >
        로그아웃
      </Button>
    </div>
  );
};

export default AdminForm;
