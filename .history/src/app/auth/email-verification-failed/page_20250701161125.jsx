import { Suspense } from 'react';
import EmailVerificationFailed from '@/components/EmailVerificationFailed';

export const dynamic = 'force-dynamic'; // Prevent static crash

export default function EmailVerificationFailedPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <EmailVerificationFailed />
    </Suspense>
  );
}