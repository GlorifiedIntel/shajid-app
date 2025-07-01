'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { FaCheckCircle } from 'react-icons/fa';

export default function SuccessPage() {
  const { data: session } = useSession();

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
      <p>We’ve received your application and will reach out via email.</p>

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