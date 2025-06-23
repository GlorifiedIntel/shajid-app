import { useState } from 'react';
import styles from './application.module.css';

export default function Step3({ onNext, onBack, onSaveExit }) {
  const [form, setForm] = useState({
    qualification: '',
    sittings: '1',
    examTypes: [],
    resultFile: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, files, checked } = e.target;
    if (type === 'checkbox') {
      const updated = checked
        ? [...form.examTypes, value]
        : form.examTypes.filter((val) => val !== value);
      setForm((prev) => ({ ...prev, examTypes: updated }));
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
      <label>Highest Qualification: <input name="qualification" onChange={handleChange} required /></label>
      <label>O’Level Sittings:
        <select name="sittings" onChange={handleChange}>
          <option>1</option>
          <option>2</option>
        </select>
      </label>
      <fieldset>
        <legend>Exam Types:</legend>
        <label><input type="checkbox" name="examTypes" value="WAEC" onChange={handleChange} /> WAEC</label>
        <label><input type="checkbox" name="examTypes" value="NECO" onChange={handleChange} /> NECO</label>
        <label><input type="checkbox" name="examTypes" value="NABTEB" onChange={handleChange} /> NABTEB</label>
      </fieldset>
      <label>Upload Result: <input type="file" name="resultFile" onChange={handleChange} /></label>

      <button type="button" onClick={onBack}>← Back</button>
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? <span className={styles.spinner}></span> : <>🎓 Save and Continue</>}
      </button>
      <button type="button" onClick={onSaveExit}>💤 Save & Exit</button>
    </form>
  );
}
