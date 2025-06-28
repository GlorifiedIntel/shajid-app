'use client';

import { useForm } from 'react-hook-form';

export default function Step4ExamResults() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log('Step 4 data:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Exam Type</label>
      <select {...register('examType')} required>
        <option value="">-- Select --</option>
        <option value="waec">WAEC</option>
        <option value="neco">NECO</option>
        <option value="nabteb">NABTEB</option>
      </select>

      <label>Exam Year</label>
      <input type="number" {...register('examYear')} required />

      <label>Subject 1</label>
      <input {...register('subject1')} required />
      <label>Grade 1</label>
      <input {...register('grade1')} required />

      {/* Repeat for Subject 2–5 as needed */}

      <button type="submit">Next</button>
    </form>
  );
}