'use client';

import { useSearchParams } from 'next/navigation';

export default function EmailVerificationFailed() {
  const searchParams = useSearchParams();
  const reason = searchParams.get('reason');

  return (
    <div className="text-center">
      <h1 className="text-red-600 text-xl font-bold">Email Verification Failed</h1>
      {reason && <p className="mt-2 text-gray-700">Reason: {reason}</p>}
      <p className="mt-4">Please try verifying again or contact support.</p>
    </div>
  );
}
