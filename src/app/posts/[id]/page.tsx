import CategoryChip from '@/components/CategoryChip';
import { getMdxMetdata } from '@/utils/parse';
import { format } from 'date-fns';
import fs from 'fs';
import { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import path from 'path';
import { HTMLAttributes } from 'react';

export const generateMetadata = ({
  params,
}: {
  params: { id: string };
}): Metadata => {
  try {
    const filePath = path.join(
      process.cwd(),
      'public',
      'posts',
      `${params.id}.mdx`
    );
    const source = fs.readFileSync(filePath, 'utf8');
    const metadataRecord = getMdxMetdata(source);
    const { title, description, previewImage } = metadataRecord;

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
  try {
    const filePath = path.join(
      process.cwd(),
      'public',
      'posts',
      `${params.id}.mdx`
    );
    const source = fs.readFileSync(filePath, 'utf8');
    const metadataRecord = getMdxMetdata(source);

    return (
      <div className="pb-10 pt-4">
        <MDXRemote
          source={source}
          components={{
            h1: ({ children }) => (
              <h1 className="mb-6 flex flex-col gap-1 border-b-1 border-b-gray-700 py-3 text-2xl">
                <div className="flex items-center gap-2">
                  <CategoryChip
                    category={metadataRecord.category ?? ''}
                    size="md"
                  />
                  <span className="text-sm text-default-500">
                    {format(new Date(metadataRecord.date), 'yyyy년 M월 d일')}
                  </span>
                </div>
                {children}
              </h1>
            ),
            hr: () => <hr className="my-3 border-gray-700" />,
            p: ({ children }) => (
              <p className="whitespace-pre-wrap py-1">{children}</p>
            ),
            ul: ({ children }) => <ul className="mb-1 pl-4">{children}</ul>,
            ol: ({ children }) => <ol className="mb-1 pl-4">{children}</ol>,
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
          }}
        />
      </div>
    );
  } catch {
    notFound();
  }
};

export default Posts;
