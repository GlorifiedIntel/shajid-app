import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

export default async function Page() {
  const session = await getServerSession(authOptions);

  // 🔒 Redirect to login if not authenticated
  if (!session) redirect('/auth/login');

  // ✅ Logged-in user – render the form
  return (
    <div className="form-wrapper">
      <h2>Step 0: Payment</h2>
      {/* Your payment component or form here */}
    </div>
  );
}