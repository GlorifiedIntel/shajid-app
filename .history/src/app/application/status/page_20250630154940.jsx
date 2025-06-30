export default function AdmissionStatusPage() {
  const mockStatus = 'Pending'; // Replace with actual DB query

  return (
    <div className="application-page">
      <h1>Admission Status</h1>
      <p>Your current admission status is:</p>
      <div className="status-box">{mockStatus}</div>
    </div>
  );
}