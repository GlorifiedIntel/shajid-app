'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function EmailVerificationFailed() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const reason = searchParams.get('reason');

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push('/signin');
    }, 5000); // Redirect after 5 seconds

    return () => clearTimeout(timeout); // Cleanup on unmount
  }, [router]);

  return (
    <div className="text-center mt-10">
      <h1 className="text-2xl font-bold text-red-600">Email Verification Failed</h1>
      {reason && <p className="mt-2 text-gray-800">Reason: {reason}</p>}
      <p className="mt-4 text-sm text-gray-500">
        Redirecting you to the sign-in page in 5 seconds...
      </p>
    </div>
  );
}
🔁 Optional Improvements