import { useState } from 'react';
import styles from './application.module.css';

export default function Step1({ onNext }) {
  const [form, setForm] = useState({
    fullName: '',
    gender: '',
    dob: '',
    email: '',
    phone: '',
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
    <form id='form' onSubmit={handleSubmit}>
      <label>Full Name: <input name="fullName" onChange={handleChange} required /></label>
      <label>Gender: 
        <select name="gender" onChange={handleChange} required>
          <option value="">Select</option>
          <option>Male</option>
          <option>Female</option>
        </select>
      </label>
      <label>Date of Birth: <input type="date" name="dob" onChange={handleChange} required /></label>
      <label>Email: <input type="email" name="email" onChange={handleChange} required /></label>
      <label>Phone Number: <input type="tel" name="phone" onChange={handleChange} required /></label>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? <span className={styles.spinner}></span> : <>🧍‍♀️ Save and Continue</>}
      </button>
    </form>
  );
}