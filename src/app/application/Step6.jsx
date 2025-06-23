import { useState } from 'react';
import styles from './application.module.css';

export default function Step6({ onNext, onBack, onSaveExit }) {
  const [form, setForm] = useState({
    paymentMethod: '',
    paymentProof: null,
    transactionId: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({ ...prev, [name]: files ? files[0] : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      onNext(form);
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Payment Method:
        <select name="paymentMethod" onChange={handleChange} required>
          <option value="">Select</option>
          <option>Bank Transfer</option>
          <option>Card</option>
          <option>Remita</option>
        </select>
      </label>
      <label>Upload Payment Proof: <input name="paymentProof" type="file" onChange={handleChange} required /></label>
      <label>Transaction ID: <input name="transactionId" onChange={handleChange} required /></label>

      <button type="button" onClick={onBack}>← Back</button>
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? <span className={styles.spinner}></span> : <>💳 Save and Continue</>}
      </button>
      <button type="button" onClick={onSaveExit}>💤 Save & Exit</button>
    </form>
  );
}
