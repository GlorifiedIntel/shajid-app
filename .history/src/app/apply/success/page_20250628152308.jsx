import Link from 'next/link';

export default function SuccessPage() {
  return (
    <div className="success-page">
      <h1 className="success-title">🎉 Application Submitted Successfully!</h1>

      <p className="success-message">
        Thank you for completing your application to <strong>Shajid College of Nursing & Midwifery</strong>.
        A copy of your application PDF has been sent to your email.
      </p>

      <div className="success-actions">
        <Link href="/dashboard">
          <button className="btn btn-primary">Go to My Dashboard</button>
        </Link>

        <Link href="/">
          <button className="btn btn-secondary">Return to Homepage</button>
        </Link>
      </div>

      {/* Optional PDF download link if stored locally or in GridFS */}
      {/* <a href="/api/download/my-application" target="_blank">Download Application PDF</a> */}
    </div>
  );
}