'use client';

export default function Step7Review() {
  const handleSubmit = () => {
    console.log('Submit final application');
  };

  return (
    <div>
      <h3>Review Your Application</h3>
      {/* Render stored data here (from context or session) */}
      <button onClick={handleSubmit}>Submit Application</button>
    </div>
  );
}