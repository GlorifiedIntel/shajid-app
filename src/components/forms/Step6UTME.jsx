'use client';

import { useForm } from 'react-hook-form';

export default function Step6UTME() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log('Step 6 data:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>JAMB Registration Number</label>
      <input {...register('jambRegNo')} required />

      <label>JAMB Score</label>
      <input type="number" {...register('jambScore')} required />

      <button type="submit">Next</button>
    </form>
  );
}