import PostDetail from '@/components/PostDetail';
import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';

type PostPageProps = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params: { id } }: PostPageProps) {
  const supabase = createClient();
  const { data } = await supabase
    .from('Post')
    .select('title, content, preview_image_url')
    .eq('id', Number(id));

  if (!data || !data[0])
    return {
      title: '동훈의 블로그',
      description: '장동훈이 잘 살아가기 위해 정리하는 생각들',
    };

  const title = data[0].title;
  const description = data[0].content.split('. ')[0].concat('.');
  const url = data[0].preview_image_url || `/api/og?title=${title}`;

  return {
    metadataBase: new URL('https://blog.dhoonjang.io'),
    title,
    description,
    openGraph: {
      title,
      description,
      siteName: '동훈의 블로그',
      images: [
        {
          url,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      title,
      description,
      images: url,
    },
  };
}

export async function generateStaticParams() {
  const supabase = createClient();
  const { data } = await supabase.from('Post').select('id');
  if (!data) return [];
  return data.map(({ id }) => ({ id: String(id) }));
}

const PostPage = async ({ params: { id } }: PostPageProps) => {
  const supabase = createClient();
  const { data } = await supabase.from('Post').select('*').eq('id', Number(id));
  if (!data || !data[0] || data[0].status !== 'PUBLISHED') return notFound();

  const { title, category, content, created_at, preview_image_url, status } =
    data[0];

  return (
    <PostDetail
      title={title}
      category={category}
      content={content}
      created_at={created_at}
      imageUrl={preview_image_url}
      status={status}
    />
  );
};

export default PostPage;
