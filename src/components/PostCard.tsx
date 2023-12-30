import { Post } from '@/types';
import { cn } from '@/utils/style';
import { Card, CardBody, CardHeader, Chip } from '@nextui-org/react';
import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

export type PostCardProps = Omit<Post, 'tags'> & {
  className?: string;
};

const PostCard: FC<PostCardProps> = ({
  id,
  title,
  created_at,
  content,
  preview_image_url,
  className,
  category,
}) => (
  <Link href={`/posts/${id}`}>
    <Card className={cn('py-4', className)}>
      <CardHeader className="flex-col items-start gap-2 px-4 py-2">
        <div className="flex items-center gap-2">
          <small className="text-default-500">
            {format(new Date(created_at), 'yyyy년 M월 d일')}
          </small>
          <Chip size="sm" color="primary">
            {category}
          </Chip>
        </div>
        <h2 className="line-clamp-2 text-2xl font-bold">{title}</h2>
      </CardHeader>
      <CardBody className="flex flex-col gap-3 py-1">
        <div className="relative aspect-[2/1]">
          <Image
            src={
              preview_image_url ?? `/api/og?title=${encodeURIComponent(title)}`
            }
            fill
            sizes="360px"
            alt={title}
            className="rounded-xl object-cover"
          />
        </div>
        <p className="line-clamp-3 text-medium text-gray-400">{content}</p>
      </CardBody>
    </Card>
  </Link>
);

export default PostCard;
