import PostCard from '@/components/PostCard';
import { getMdxMetdata } from '@/utils/parse';
import fs from 'fs';
import path from 'path';

const Blog = async () => {
  const folderPath = path.join(process.cwd(), 'public', 'posts');

  const postFolder = await fs.readdirSync(folderPath);

  const fileNames = postFolder.filter((n) => n.includes('.mdx'));

  const sourceList = (await Promise.all(
    fileNames.map(
      (fileName) =>
        new Promise((resolve) => {
          const filePath = path.join(folderPath, fileName);
          const source = fs.readFileSync(filePath, 'utf8');
          resolve({
            id: fileName.split('.mdx')[0],
            source,
          });
        })
    )
  )) as {
    id: string;
    source: string;
  }[];

  const postList = sourceList.map(({ id, source }) => ({
    id,
    ...getMdxMetdata(source),
  }));

  return (
    <div className="pb-20 pt-10 @container">
      <div className="grid grid-cols-1 gap-x-4 gap-y-6 @xl:grid-cols-2 @4xl:grid-cols-3">
        {postList.map(({ ...post }) => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>
    </div>
  );
};

export default Blog;
