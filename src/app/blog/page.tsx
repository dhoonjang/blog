import { getServerSession } from 'next-auth';
import { cn } from '@/lib/style';

const Blog = () => {
  const session = getServerSession();
  console.log(session);

  return <h1 className={cn('font-medium text-large text-left')}>blog</h1>;
};

export default Blog;
