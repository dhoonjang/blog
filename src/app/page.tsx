import PostCard from '@/components/PostCard';
import { MdxMetadata } from '@/utils/parse';
import fs from 'fs';
import { CompileMDXResult, compileMDX } from 'next-mdx-remote/rsc';
import path from 'path';

type PostMetadata = CompileMDXResult<MdxMetadata> & { id: string };
const Blog = async () => {
  const folderPath = path.join(process.cwd(), 'public', 'posts');

  const postFolder = await fs.readdirSync(folderPath);

  const fileNames = postFolder.filter((n) => n.includes('.mdx'));

  const postList = (await Promise.all(
    fileNames.map(
      (fileName) =>
        new Promise((resolve) => {
          const filePath = path.join(folderPath, fileName);
          const source = fs.readFileSync(filePath, 'utf8');
          compileMDX<MdxMetadata>({
            source,
            options: {
              parseFrontmatter: true,
            },
          }).then((post) =>
            resolve({ ...post, id: fileName.split('.mdx')[0] })
          );
        })
    )
  )) as PostMetadata[];

  return (
    <div className="pb-20 pt-10 @container">
      <div className="grid grid-cols-1 gap-x-4 gap-y-6 @xl:grid-cols-2 @4xl:grid-cols-3">
        {postList.map(({ id, frontmatter }) => (
          <PostCard key={id} id={id} {...frontmatter} />
        ))}
      </div>
    </div>
  );
};

export default Blog;
