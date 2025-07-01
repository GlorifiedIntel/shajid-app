'use client'

export default function ApplicationPreviewPage() {
  return (
    <div className="application-page">
      <h1>Application Preview</h1>
      <p>This is a summary of your submitted information.</p>

      <div className="application-summary">
        <p><strong>Full Name:</strong> John Doe</p>
        <p><strong>Program:</strong> Basic Nursing</p>
        <p><strong>Status:</strong> Submitted</p>
        <p><strong>Date Submitted:</strong> June 30, 2025</p>
      </div>

      <button onClick={() => window.print()}>Print Summary</button>
    </div>
  );
}