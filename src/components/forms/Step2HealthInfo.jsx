'use client';

import { useForm } from 'react-hook-form';

export default function Step2HealthInfo() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log('Step 2 data:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Do you have any chronic illness?</label>
      <input {...register('chronicIllness')} required />

      <label>Blood Group</label>
      <input {...register('bloodGroup')} required />

      <label>Genotype</label>
      <input {...register('genotype')} required />

      <label>Emergency Contact</label>
      <input {...register('emergencyContact')} required />

      <button type="submit">Next</button>
    </form>
  );
}