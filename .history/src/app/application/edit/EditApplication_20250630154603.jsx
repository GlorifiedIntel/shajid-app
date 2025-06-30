'use client';

import { useState } from 'react';

export default function EditApplicationPage() {
  const [program, setProgram] = useState('');
  const [otherField, setOtherField] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit updated form data
  };

  return (
    <div className="application-page">
      <h1>Edit Your Application</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Program:</label>
          <input
            type="text"
            value={program}
            onChange={(e) => setProgram(e.target.value)}
            placeholder="e.g. Basic Midwifery"
          />
        </div>
        <div>
          <label>Other Field:</label>
          <input
            type="text"
            value={otherField}
            onChange={(e) => setOtherField(e.target.value)}
          />
        </div>
        <button type="submit">Update Application</button>
      </form>
    </div>
  );
}