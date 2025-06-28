'use client';

import { useForm } from 'react-hook-form';

export default function Step3SchoolsAttended() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log('Step 3 data:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Primary School</label>
      <input {...register('primarySchool')} required />

      <label>Secondary School</label>
      <input {...register('secondarySchool')} required />

      <label>Other Institutions (if any)</label>
      <input {...register('otherSchools')} />

      <button type="submit">Next</button>
    </form>
  );
}