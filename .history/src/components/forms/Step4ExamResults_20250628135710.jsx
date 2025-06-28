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

<label>Subject 2</label>
<input {...register('subject2')} required />
<label>Grade 2</label>
<input {...register('grade2')} required />

<label>Subject 3</label>
<input {...register('subject3')} required />
<label>Grade 3</label>
<input {...register('grade3')} required />

<label>Subject 4</label>
<input {...register('subject4')} required />
<label>Grade 4</label>
<input {...register('grade4')} required />

<label>Subject 5</label>
<input {...register('subject5')} required />
<label>Grade 5</label>
<input {...register('grade5')} required />

<label>Subject 6</label>
<input {...register('subject6')} required />
<label>Grade 6</label>
<input {...register('grade6')} required />

<label>Subject 7</label>
<input {...register('subject7')} required />
<label>Grade 7</label>
<input {...register('grade7')} required />

<label>Subject 8</label>
<input {...register('subject8')} required />
<label>Grade 8</label>
<input {...register('grade8')} required />

<label>Subject 9</label>
<input {...register('subject9')} required />
<label>Grade 9</label>
<input {...register('grade9')} required />

      <button type="submit">Next</button>
    </form>
  );
}