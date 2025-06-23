import { useState } from 'react';
import styles from './application.module.css';

export default function Step5({ onNext, onBack, onSaveExit }) {
  const [form, setForm] = useState({
    hasMedicalCondition: false,
    medicalDetails: '',
    hasConviction: false,
    convictionDetails: '',
    fitnessCert: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, type, value, checked, files } = e.target;
    if (type === 'checkbox') {
      setForm((prev) => ({ ...prev, [name]: checked }));
    } else if (type === 'file') {
      setForm((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
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
      <label><input type="checkbox" name="hasMedicalCondition" onChange={handleChange} /> I have a known medical condition</label>
      {form.hasMedicalCondition && (
        <label>Details: <textarea name="medicalDetails" onChange={handleChange} /></label>
      )}
      <label><input type="checkbox" name="hasConviction" onChange={handleChange} /> I have a criminal conviction</label>
      {form.hasConviction && (
        <label>Details: <textarea name="convictionDetails" onChange={handleChange} /></label>
      )}
      <label>Upload Fitness Certificate: <input name="fitnessCert" type="file" onChange={handleChange} /></label>

      <button type="button" onClick={onBack}>← Back</button>
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? <span className={styles.spinner}></span> : <>❤️ Save and Continue</>}
      </button>
      <button type="button" onClick={onSaveExit}>💤 Save & Exit</button>
    </form>
  );
}
