'use client';

import { useForm } from 'react-hook-form';

export default function Step3SchoolsAttended({ savedData }) {
  const { register, handleSubmit } = useForm({
    defaultValues: savedData || {}, // ✅ Use this — it works perfectly
  });

  const onSubmit = (data) => {
    console.log('Submitted:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('schoolName')} />
      <input {...register('startYear')} />
      <input {...register('endYear')} />
      <button type="submit">Next</button>
    </form>
  );
}