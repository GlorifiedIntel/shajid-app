'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaCheckCircle } from 'react-icons/fa';
import { useEffect } from 'react';

// ⛔️ Prevent static generation for useSession()
export const dynamic = 'force-dynamic';

export default function SuccessPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/auth/sign-in');
    }

    if (status === 'authenticated' && session?.user?.role !== 'applicant') {
      router.replace('/unauthorized');
    }
  }, [session, status, router]);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  return (
    <div className="success-container">
      <div className="icon-box">
        <FaCheckCircle size={80} color="#28a745" />
      </div>
      <h1>Application Submitted Successfully!</h1>
      <p>
        Thank you, {session?.user?.name || 'applicant'}! 🎉 <br />
        We’ve received your application and emailed your PDF summary.
      </p>
      <p>We’ll reach out to you via email if necessary.</p>

      <div className="button-group">
        <Link href="/dashboard">
          <button className="btn">Go to Dashboard</button>
        </Link>

        <Link href="/api/download/pdf">
          <button className="btn">⬇ Download PDF</button>
        </Link>

        <Link href="/">
          <button className="btn secondary">Return Home</button>
        </Link>
      </div>
    </div>
  );
}