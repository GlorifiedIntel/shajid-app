import { useState } from 'react';
import styles from './application.module.css';

export default function Step7({ data, onBack, clearForm, onSaveExit }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [declared, setDeclared] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!agreed || !declared) {
      alert('Please agree to the terms and declare your information is accurate.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      alert('✅ Application submitted successfully!');
      clearForm();
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>📄 Review Your Application</h3>

      <div className={styles.reviewSection}>
        <h4>👤 Personal Information</h4>
        <p><strong>Full Name:</strong> {data.fullName}</p>
        <p><strong>Gender:</strong> {data.gender}</p>
        <p><strong>Date of Birth:</strong> {data.dob}</p>
        <p><strong>Email:</strong> {data.email}</p>
        <p><strong>Phone:</strong> {data.phone}</p>
      </div>

      <div className={styles.reviewSection}>
        <h4>🏠 Address & Kin</h4>
        <p><strong>Permanent Address:</strong> {data.permanentAddress}</p>
        <p><strong>Current Address:</strong> {data.currentAddress}</p>
        <p><strong>State of Origin:</strong> {data.stateOfOrigin}</p>
        <p><strong>LGA:</strong> {data.lga}</p>
        <p><strong>Next of Kin:</strong> {data.nextOfKinName} ({data.nextOfKinRelationship}, {data.nextOfKinPhone})</p>
      </div>

      <div className={styles.reviewSection}>
        <h4>🎓 Academic Background</h4>
        <p><strong>Qualification:</strong> {data.qualification}</p>
        <p><strong>O'Level Sittings:</strong> {data.sittings}</p>
        <p><strong>Exam Types:</strong> {data.examTypes?.join(', ')}</p>
        <p><strong>Result File:</strong> {data.resultFile?.name || 'Not uploaded'}</p>
      </div>

      <div className={styles.reviewSection}>
        <h4>📘 Program Selection</h4>
        <p><strong>Program:</strong> {data.program}</p>
        <p><strong>Entry Mode:</strong> {data.entryMode}</p>
        <p><strong>Campus:</strong> {data.campus}</p>
      </div>

      <div className={styles.reviewSection}>
        <h4>❤️ Health Information</h4>
        <p><strong>Medical Condition:</strong> {data.hasMedicalCondition ? 'Yes' : 'No'}</p>
        {data.hasMedicalCondition && (
          <p><strong>Details:</strong> {data.medicalDetails}</p>
        )}
        <p><strong>Criminal Record:</strong> {data.hasConviction ? 'Yes' : 'No'}</p>
        {data.hasConviction && (
          <p><strong>Details:</strong> {data.convictionDetails}</p>
        )}
        <p><strong>Fitness Certificate:</strong> {data.fitnessCert?.name || 'Not uploaded'}</p>
      </div>

      <div className={styles.reviewSection}>
        <h4>💳 Payment</h4>
        <p><strong>Method:</strong> {data.paymentMethod}</p>
        <p><strong>Transaction ID:</strong> {data.transactionId}</p>
        <p><strong>Proof:</strong> {data.paymentProof?.name || 'Not uploaded'}</p>
      </div>

      <div className={styles.reviewSection}>
        <label>
          <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
          I agree to the terms and conditions.
        </label><br />
        <label>
          <input type="checkbox" checked={declared} onChange={(e) => setDeclared(e.target.checked)} />
          I declare that the information provided is accurate.
        </label>
      </div>

      <div style={{ marginTop: '1rem' }}>
        <button type="button" onClick={onBack}>← Back</button>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? <span className={styles.spinner}></span> : <>🚀 Submit Application</>}
        </button>
        <button type="button" onClick={onSaveExit}>💤 Save & Exit</button>
        <button type="button" onClick={() => window.print()}>🖨️ Print</button>
  <button type="button" onClick={handleDownloadPDF}>⬇️ Download PDF</button>
      </div>
    </form>
  );
}