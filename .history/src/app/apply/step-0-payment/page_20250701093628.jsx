import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import Step0Payment from '@/components/forms/Step0Payment';

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session) redirect('/auth/sign-in');

  // ✅ Check role
  if (session.user.role !== 'applicant') {
    redirect('/unauthorized');
  }

  return (
    <div className="form-wrapper">
      <h2>Step 0: Payment</h2>
      <Step0Payment />
    </div>
  );
}