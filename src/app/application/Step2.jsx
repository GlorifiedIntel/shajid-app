import { useState } from 'react';
import styles from './appliation.module.css';

export default function Step2({ onNext, onBack, onSaveExit }) {
  const [form, setForm] = useState({
    permanentAddress: '',
    currentAddress: '',
    stateOfOrigin: '',
    lga: '',
    nextOfKinName: '',
    nextOfKinRelationship: '',
    nextOfKinPhone: '',
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
      <label>Permanent Address: <textarea name="permanentAddress" onChange={handleChange} required /></label>
      <label>Current Address: <textarea name="currentAddress" onChange={handleChange} required /></label>
      <label>State of Origin: <input name="stateOfOrigin" onChange={handleChange} required /></label>
      <label>LGA: <input name="lga" onChange={handleChange} required /></label>
      <label>Next of Kin Name: <input name="nextOfKinName" onChange={handleChange} required /></label>
      <label>Relationship: <input name="nextOfKinRelationship" onChange={handleChange} required /></label>
      <label>Next of Kin Phone: <input name="nextOfKinPhone" onChange={handleChange} required /></label>

      <button type="button" onClick={onBack}>← Back</button>
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? <span className={styles.spinner}></span> : <>📞 Save and Continue</>}
      </button>
      <button type="button" onClick={onSaveExit}>💤 Save & Exit</button>
    </form>
  );
}
