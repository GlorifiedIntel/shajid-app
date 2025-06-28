'use client';

import { useFormData } from '@/context/FormContext';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Step7ReviewSubmit() {
  const { data: session } = useSession();
  const { formData } = useFormData();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const handleFinalSubmit = async () => {
    setSubmitting(true);

    try {
      const res = await fetch('/api/apply/final-submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: session?.user?.id,
          fullForm: formData,
        }),
      });

      if (res.ok) {
        router.push('/apply/success');
      } else {
        alert('Something went wrong submitting your application.');
      }
    } catch (error) {
      console.error(error);
      alert('Server error submitting form.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2>Review Your Application</h2>

      <pre className="bg-light border p-3 rounded">
        {JSON.stringify(formData, null, 2)}
      </pre>

      <button onClick={handleFinalSubmit} disabled={submitting}>
        {submitting ? 'Submitting...' : 'Submit Final Application'}
      </button>
    </div>
  );
}