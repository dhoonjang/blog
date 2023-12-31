import CheckAuth from '@/components/CheckAuth';
import PostList from '@/components/PostList';
import AdminForm from '@/components/admin/AdminForm';
import LoginForm from '@/components/admin/LoginForm';
import { Link } from '@/navigation';
import { Button } from '@nextui-org/react';

const Admin = () => (
  <div className="container flex flex-col py-10">
    <CheckAuth fallback={<LoginForm />}>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl">블로그 글 목록</h2>
        <Link href="/posts/new">
          <Button fullWidth color="primary" type="button" size="sm">
            새로운 글 작성
          </Button>
        </Link>
      </div>
      <div className="py-5">
        <PostList isAdmin />
      </div>
      <AdminForm />
    </CheckAuth>
  </div>
);

export default Admin;
