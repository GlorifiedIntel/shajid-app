import Link from 'next/link';
import Image from 'next/image';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { connectToDB } from '@/lib/mongodb';
import Application from '@/models/Application';
import './dashboard.css';

export default async function DashboardLayout({ children }) {
  const session = await getServerSession(authOptions);

  // Get the passport image from DB
  await connectToDB();
  const application = await Application.findOne({ userId: session.user.id });

  const photoUrl = application?.step1?.passportUrl || '/default-avatar.png';
  const displayName = session?.user?.name || session?.user?.email;

  return (
    <div className="dashboard-layout">
      <aside className="dashboard-sidebar">
        <div className="sidebar-profile">
          <Image
            src={photoUrl}
            alt="Applicant Passport"
            width={80}
            height={80}
            className="profile-img"
          />
          <p className="welcome-text">Welcome,</p>
          <h4>{displayName}</h4>
        </div>

        <nav className="sidebar-nav">
          <Link href="/dashboard">🏠 Home</Link>
          <Link href="/dashboard/application">📄 My Application</Link>
          <Link href="/api/download/pdf/me" target="_blank">📥 Download PDF</Link>
          <Link href="/auth/logout">🔓 Logout</Link>
        </nav>
      </aside>

      <main className="dashboard-content">
        {children}
      </main>
    </div>
  );
}