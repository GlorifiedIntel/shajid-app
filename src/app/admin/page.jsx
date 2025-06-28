// src/app/admin/page.jsx
import { withRole } from '@/lib/withRole';
import AdminAppList from '@/components/admin/AdminAppList';

const AdminDashboard = () => <AdminAppList />;

// Allow only users with 'admin' role
export default withRole(AdminDashboard, ['admin']);