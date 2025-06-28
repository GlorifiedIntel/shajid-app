import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminAppList from '@/components/admin/AdminAppList';

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== 'admin') {
    return <div className="p-10 text-red-600">Unauthorized Access</div>;
  }

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <main className="admin-content">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <AdminAppList />
      </main>
    </div>
  );
}