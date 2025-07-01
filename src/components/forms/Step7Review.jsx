'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useFormContext } from '@/context/MultiStepContext';
import { generateStyledPDF } from '@/utils/generateStyledPDF'; // make sure this is browser-safe
import download from 'downloadjs';

export default function Step7Review() {
  const { data: session } = useSession();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [previewing, setPreviewing] = useState(false);

  const { formData } = useFormContext(); // ✅ Get full form data from context

  const handleFinalSubmit = async () => {
    if (!formData) return alert('No data to submit');
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
    } catch (err) {
      console.error(err);
      alert('Server error submitting form.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDownloadPDF = async () => {
    setPreviewing(true);

    try {
      const pdfBytes = await generateStyledPDF(formData); // ✅ Generate in browser
      download(pdfBytes, 'shajid-application.pdf', 'application/pdf'); // ✅ Download
    } catch (err) {
      console.error(err);
      alert('Error generating PDF');
    } finally {
      setPreviewing(false);
    }
  };

  return (
    <div className="step-7-review">
      <h2>Review Your Application</h2>

      <pre className="bg-light border p-3 rounded overflow-auto">
        {JSON.stringify(formData, null, 2)}
      </pre>

      <button onClick={handleDownloadPDF} disabled={previewing}>
        {previewing ? 'Generating PDF...' : 'Download PDF Preview'}
      </button>

      <br /><br />

      <button
        onClick={handleFinalSubmit}
        disabled={submitting}
        className="btn-submit-final"
      >
        {submitting ? 'Submitting...' : 'Submit Final Application'}
      </button>
    </div>
  );
}