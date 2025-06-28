import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { connectToDB } from '@/lib/mongodb';
import Application from '@/models/Application';

export default async function DashboardHome() {
  const session = await getServerSession(authOptions);
  if (!session) return <p>Please login to view your dashboard.</p>;

  await connectToDB();
  const application = await Application.findOne({ userId: session.user.id });

  const submitted = application?.submitted ?? false;
  const program = application?.step5?.program ?? 'Not selected';
  const submittedAt = application?.updatedAt?.toLocaleDateString?.() ?? '—';

  return (
    <div>
      <h1 className="mb-4">Welcome, {session.user.name || 'Applicant'}!</h1>

      <div className="dashboard-stats">
        <div className="stat-card">
          <h4>Status</h4>
          <p className={submitted ? 'text-success' : 'text-danger'}>
            {submitted ? 'Submitted ✅' : 'Not Submitted ❌'}
          </p>
        </div>

        <div className="stat-card">
          <h4>Selected Program</h4>
          <p>{program}</p>
        </div>

        <div className="stat-card">
          <h4>Submitted On</h4>
          <p>{submitted ? submittedAt : '—'}</p>
        </div>
      </div>
    </div>
  );
}