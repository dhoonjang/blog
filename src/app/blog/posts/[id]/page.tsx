import { MarkdownViewer } from '@/components/Markdown';
import { createClient } from '@/utils/supabase/server';
import { Chip } from '@nextui-org/react';
import { format } from 'date-fns';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

type PostPageProps = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params: { id } }: PostPageProps) {
  const supabase = createClient(cookies());
  const { data } = await supabase.from('Post').select('*').eq('id', Number(id));

  if (!data || !data[0])
    return {
      title: '동훈의 블로그',
      description: '장동훈이 잘 살아가기 위해 정리하는 생각들',
    };

  const title = data[0].title;
  const description = data[0].content.slice(0, 100);

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
          url: `/api/og?title=${title}`,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      title,
      description,
      images: `/api/og?title=${title}`,
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
  const supabase = createClient(cookies());
  const { data } = await supabase.from('Post').select('*').eq('id', Number(id));

  if (!data || !data[0]) return notFound();

  const { title, category, tags, content, created_at, preview_image_url } =
    data[0];

  return (
    <div className="container flex flex-col gap-8 pb-40 pt-20">
      <h1 className="text-4xl font-bold">{title}</h1>
      <div className="flex flex-row items-center gap-2">
        <Chip color="primary">{category}</Chip>
        {(JSON.parse(tags) as string[]).map((tag) => (
          <Link href={`/tags/${tag}`} key={tag}>
            <Chip>{tag}</Chip>
          </Link>
        ))}
        <div className="text-sm text-gray-500">
          {format(new Date(created_at), 'yyyy년 M월 d일 HH:mm')}
        </div>
      </div>
      {preview_image_url && (
        <Image
          src={preview_image_url}
          width={0}
          height={0}
          sizes="100vw"
          alt={title}
          className="h-auto w-full"
        />
      )}
      <MarkdownViewer source={content} className="min-w-full" />
    </div>
  );
};

export default PostPage;
