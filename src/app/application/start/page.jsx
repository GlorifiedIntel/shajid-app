'use client';

import { useRouter } from 'next/navigation';

export default function StartApplicationPage() {
  const router = useRouter();

  const handleStart = () => {
    // Create draft in DB if needed
    router.push('/application/edit'); // Redirect to first step
  };

  return (
    <div className="application-page">
      <h1>Start New Application</h1>
      <p>Click below to begin your application process.</p>
      <button onClick={handleStart}>Begin Application</button>
    </div>
  );
}