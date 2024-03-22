import CategoryChip from '@/components/CategoryChip';
import { MdxMetadata } from '@/utils/parse';
import { format } from 'date-fns';
import fs from 'fs';
import { Metadata } from 'next';
import { compileMDX } from 'next-mdx-remote/rsc';
import path from 'path';
import { HTMLAttributes } from 'react';

export const generateMetadata = async ({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> => {
  try {
    const filePath = path.join(
      process.cwd(),
      'public',
      'posts',
      `${params.id}.mdx`
    );
    const source = fs.readFileSync(filePath, 'utf8');

    const { frontmatter } = await compileMDX<MdxMetadata>({
      source,
      options: {
        parseFrontmatter: true,
      },
    });
    const { title: postTitle, description, previewImage } = frontmatter;
    const title = `[동훈의 블로그] ${postTitle}`;

    return {
      metadataBase: new URL('https://blog.dhoonjang.io'),
      title,
      description,
      openGraph: {
        title,
        description,
        images: [
          {
            url: previewImage ?? `/api/og?title=${title}`,
            width: 1200,
            height: 630,
          },
        ],
      },
      twitter: {
        title,
        description,
        images: previewImage ?? `/api/og?title=${title}`,
      },
    };
  } catch {
    return {};
  }
};

const Posts = async ({ params }: { params: { id: string } }) => {
  const filePath = path.join(
    process.cwd(),
    'public',
    'posts',
    `${params.id}.mdx`
  );
  const source = fs.readFileSync(filePath, 'utf8');

  const { content, frontmatter } = await compileMDX<MdxMetadata>({
    source,
    options: {
      parseFrontmatter: true,
    },
    components: {
      h1: ({ children }) => <h1 className="mb-2 text-2xl">{children}</h1>,
      h2: ({ children }) => <h2 className="mb-1.5 text-xl">{children}</h2>,
      h3: ({ children }) => <h3 className="mb-1 text-lg">{children}</h3>,
      hr: () => <hr className="my-3 border-gray-700" />,
      p: ({ children }) => (
        <p className="whitespace-pre-wrap py-1">{children}</p>
      ),
      ul: ({ children }) => <ul className="mb-1 pl-4">{children}</ul>,
      ol: ({ children }) => <ol className="mb-1 pl-4">{children}</ol>,
      code: ({ children }) => (
        <code className="rounded-sm bg-gray-800 px-[2px]">{children}</code>
      ),
      blockquote: ({ children }) => (
        <blockquote className="my-[2px] rounded-sm bg-gray-900 px-2">
          {children}
        </blockquote>
      ),
      img: (props) => (
        // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
        <img
          className="mb-2"
          {...(props as HTMLAttributes<HTMLImageElement>)}
        />
      ),
    },
  });

  const { title, date, category } = frontmatter;

  return (
    <div className="pb-10 pt-4">
      <h1 className="mb-6 flex flex-col gap-1.5 border-b-1 border-b-gray-700 py-3 text-2xl">
        <div className="flex items-center gap-2">
          <CategoryChip category={category ?? ''} size="md" />
          <span className="text-sm text-default-500">
            {format(new Date(date), 'yyyy년 M월 d일')}
          </span>
        </div>
        {title}
      </h1>
      {content}
    </div>
  );
};

export default Posts;
