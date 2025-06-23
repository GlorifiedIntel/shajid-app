import { useState } from 'react';
import styles from './application.module.css';

export default function Step4({ onNext, onBack, onSaveExit }) {
  const [form, setForm] = useState({
    program: '',
    entryMode: '',
    campus: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

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
      <label>Program:
        <select name="program" onChange={handleChange} required>
          <option value="">Select</option>
          <option>Basic Nursing</option>
          <option>Midwifery</option>
          <option>Post-Basic Nursing</option>
        </select>
      </label>
      <label>Entry Mode:
        <select name="entryMode" onChange={handleChange}>
          <option value="">Select</option>
          <option>General Admission</option>
          <option>Direct Entry</option>
        </select>
      </label>
      <label>Preferred Campus: <input name="campus" onChange={handleChange} /></label>

      <button type="button" onClick={onBack}>← Back</button>
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? <span className={styles.spinner}></span> : <>🏥 Save and Continue</>}
      </button>
      <button type="button" onClick={onSaveExit}>💤 Save & Exit</button>
    </form>
  );
}
