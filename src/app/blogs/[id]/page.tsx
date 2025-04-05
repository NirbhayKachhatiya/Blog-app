import Comments from '@/components/comments';
import FormComment from '@/components/form-comments';
import prisma from '@/lib/db';
import { FC } from 'react';

interface BlogDetailPageProps {
  params: {
    id: string;
  };
}
const BlogDetailPage: FC<BlogDetailPageProps> = async ({ params }) => {
  const post = await prisma.post.findFirst({
    where: {
      id: params.id,
    },
    include: {
      author: true,
    },
  });

  return (
    <div className='max-w-4xl mx-auto py-8'>
      <h1 className='text-3xl font-bold m-[5px]'>{post?.title}</h1>
      <p className='bg-[#36D1DC] [box-shadow:5px_5px] rounded-[15px]  w-auto inline-block px-3.5'>Written by: {post?.author?.name}</p>
      <div className='mt-4'>{post?.content}</div>

      <Comments postId={params.id} />
      <FormComment postId={params.id} />
    </div>
  );
};

export default BlogDetailPage;
