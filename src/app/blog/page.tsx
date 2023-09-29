import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { cn } from '@/lib/style';

const Blog = async () => {
  const session = await getServerSession(authOptions);
  console.log(session);

  return <h1 className={cn('font-medium text-large text-left')}>blog</h1>;
};

export default Blog;
