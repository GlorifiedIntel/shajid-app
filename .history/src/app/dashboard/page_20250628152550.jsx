import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { connectToDB } from '@/lib/mongodb';
import Application from '@/models/Application';
import Link from 'next/link';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) return <p>Please login to view your dashboard.</p>;

  await connectToDB();

  const application = await Application.findOne({ userId: session.user.id });

  return (
    <div className="dashboard-container">
      <h1>Welcome, {session.user.name}</h1>

      <h2>📄 Application Status</h2>
      {application?.submitted ? (
        <>
          <p>Your application has been submitted successfully.</p>
          <a
            href={`/api/download/pdf/${session.user.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Download Application PDF
          </a>
        </>
      ) : (
        <p>You have not completed your application yet.</p>
      )}

      <br />

      <Link href="/apply/step-0-payment">
        <button className="btn btn-secondary">Continue Application</button>
      </Link>
    </div>
  );
}