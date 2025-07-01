'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

export default function EmailVerificationFailed() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const reason = searchParams.get('reason');

  useEffect(() => {
    toast.error('Email verification failed. Redirecting to sign-in...');

    const timeout = setTimeout(() => {
      router.push('/signin');
    }, 5000);

    return () => clearTimeout(timeout);
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