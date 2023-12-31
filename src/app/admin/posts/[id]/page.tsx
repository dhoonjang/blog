'use client';

import PostForm from '@/components/admin/PostForm';
import { useRouter } from '@/navigation';
import { Post } from '@/types';
import { createClient } from '@/utils/supabase/client';
import { Button } from '@nextui-org/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { revalidatePath } from 'next/cache';
import Link from 'next/link';
import { notFound } from 'next/navigation';

type PostPageProps = {
  params: {
    id: string;
  };
};

const supabase = createClient();

const PostPage = ({ params: { id } }: PostPageProps) => {
  const router = useRouter();

  const { data, refetch } = useQuery({
    queryKey: ['posts', id],
    queryFn: async () => {
      const { data } = await supabase
        .from('Post')
        .select('*')
        .eq('id', Number(id));
      if (!data) return notFound();
      return data[0];
    },
  });

  const { mutate: updateStatus } = useMutation({
    mutationKey: ['posts', id, 'patch'],
    mutationFn: async (prevStatus: Post['status']) => {
      const status = prevStatus === 'DRAFT' ? 'PUBLISHED' : 'DRAFT';
      await supabase.from('Post').update({ status }).eq('id', Number(id));
    },
    onSuccess: () => {
      revalidatePath(`/blog/posts/${id}`);
      revalidatePath(`/admin/posts/${id}`);
      revalidatePath(`/posts/${id}`);
      refetch();
    },
  });

  const { mutate: deletePost, isPending: isDeleteLoading } = useMutation({
    mutationKey: ['posts', id, 'patch'],
    mutationFn: async () => {
      await supabase.from('Post').delete().eq('id', Number(id));
    },
    onSuccess: () => {
      revalidatePath(`/blog/posts/${id}`);
      revalidatePath(`/admin/posts/${id}`);
      revalidatePath(`/posts/${id}`);
      router.push('/');
    },
  });

  if (!data) return null;
  const { title, category, content, status, preview_image_url } = data;
  return (
    <div className="container flex flex-col py-10">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-medium">글 수정</h1>
        <div className="flex gap-2">
          {status === 'PUBLISHED' && (
            <Link href={`https://blog.dhoonjang.io/posts/${id}`}>
              <Button color="primary" size="sm">
                글 보러 가기
              </Button>
            </Link>
          )}
          <Button
            color={status === 'DRAFT' ? 'primary' : 'default'}
            size="sm"
            onClick={() => updateStatus(status)}
          >
            {status === 'DRAFT' ? '공개로 전환' : '비공개로 전환'}
          </Button>
          <Button
            color="danger"
            size="sm"
            isLoading={isDeleteLoading}
            onClick={async () => {
              if (!(await window.confirm('정말로 삭제하시겠습니까?'))) return;
              deletePost();
            }}
          >
            글 삭제
          </Button>
        </div>
      </div>
      <PostForm
        id={id}
        title={title}
        category={category}
        content={content}
        imageUrl={preview_image_url}
      />
    </div>
  );
};

export default PostPage;
