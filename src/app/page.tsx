import PostList from '@/components/PostList';
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

  return (
    <div className="pb-20 pt-10">
      <PostList postListSource={sourceList} />
    </div>
  );
};

export default Blog;
