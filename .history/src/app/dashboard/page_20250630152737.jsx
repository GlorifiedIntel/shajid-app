import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { connectToDB } from '@/lib/mongodb';
import Application from '@/models/Application';
import './dashboard.css';

export default async function ApplicantDashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <p className="dashboard-message">Please login to view your dashboard.</p>;
  }

  await connectToDB();
  const application = await Application.findOne({ userId: session.user.id });

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Welcome, {session.user.name}</h1>
      <p className="dashboard-subtitle">This is your application dashboard.</p>

      {application ? (
        <div className="dashboard-card">
          <h2>Application Summary</h2>
          <p><strong>Status:</strong> {application.status || 'Pending'}</p>
          <p><strong>Program:</strong> {application.program}</p>
          <p><strong>Submitted:</strong> {application.submittedAt?.toDateString() || 'Not yet submitted'}</p>
          <a href="/application/preview" className="dashboard-button">View Submitted Application</a>
        </div>
      ) : (
        <div className="dashboard-card">
          <p>You have not started your application.</p>
          <a href="/application/start" className="dashboard-button">Start Application</a>
        </div>
      )}
    </div>
  );
}