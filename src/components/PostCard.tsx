import { MdxMetadata } from '@/utils/parsing';
import { cn } from '@/utils/style';
import { Card, CardBody, CardHeader } from '@nextui-org/react';
import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import CategoryChip from './CategoryChip';

export type PostCardProps = MdxMetadata & {
  id: string;
  className?: string;
};

const PostCard: FC<PostCardProps> = ({
  id,
  title,
  date,
  description,
  previewImage,
  className,
  category,
}) => (
  <Link href={`/posts/${id}`}>
    <Card className={cn('py-4', className)}>
      <CardHeader className="flex-col items-start gap-2 px-4 py-2">
        <div className="flex items-center gap-2">
          <small className="text-default-500">
            {format(new Date(date), 'yyyy년 M월 d일')}
          </small>
          <CategoryChip category={category} size="sm" />
        </div>
        <h2 className="line-clamp-2 text-2xl font-bold">{title}</h2>
      </CardHeader>
      <CardBody className="flex flex-col gap-3 py-1">
        <div className="relative aspect-[2/1]">
          <Image
            src={previewImage ?? `/api/og?title=${encodeURIComponent(title)}`}
            fill
            sizes="360px"
            alt={title}
            className="rounded-xl object-cover"
            priority
          />
        </div>
        <p className="line-clamp-3 text-medium text-gray-400">{description}</p>
      </CardBody>
    </Card>
  </Link>
);

export default PostCard;
