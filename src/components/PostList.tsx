'use client';

import { getMdxMetdata } from '@/utils/parsing';
import { cn } from '@/utils/style';
import { FC } from 'react';
import PostCard from './PostCard';

type PostListProps = {
  postListSource: {
    id: string;
    source: string;
  }[];
  className?: string;
};

const PostList: FC<PostListProps> = ({ postListSource, className }) => {
  const postList = postListSource.map(({ id, source }) => ({
    id,
    ...getMdxMetdata(source),
  }));

  return (
    <div
      className={cn('flex flex-col items-center gap-8 @container', className)}
    >
      <div className="grid grid-cols-1 gap-x-4 gap-y-6 @xl:grid-cols-2 @4xl:grid-cols-3">
        {postList.map(({ ...post }) => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>
    </div>
  );
};

export default PostList;
