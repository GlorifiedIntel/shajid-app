'use client';

import { useState } from 'react';
import { downloadApplicationPDF } from '@/lib/pdfClient';

export default function DownloadPDFButton({ formData }) {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    try {
      await downloadApplicationPDF(formData);
    } catch (err) {
      console.error('Failed to download PDF:', err);
      alert('An error occurred while generating the PDF.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={loading}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      {loading ? 'Generating PDF...' : 'Download PDF'}
    </button>
  );
}