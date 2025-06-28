import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/auth/login');

  return (
    <div>
      <h2>Step 1: Personal Information</h2>
      {/* Personal Info Form */}
    </div>
  );
}