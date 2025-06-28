'use client';

import { useForm } from 'react-hook-form';

export default function PersonalInfoForm() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log('Step 1 data:', data);
    // Save to context, session storage, or send to API
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Full Name</label>
      <input {...register('fullName')} required />

      <label>Date of Birth</label>
      <input type="date" {...register('dob')} required />

      <label>Gender</label>
      <div>
        <label>
          <input type="radio" value="Male" {...register('gender')} required /> Male
        </label>
        <label>
          <input type="radio" value="Female" {...register('gender')} required /> Female
        </label>
      </div>

      <label>Phone Number</label>
      <input type="tel" {...register('phone')} required />

      <label>Email Address</label>
      <input type="email" {...register('email')} required />

      <label>Parent/Guardian's Full Name</label>
      <input {...register('parentName')} required />

      <label>Parent/Guardian's Phone Number</label>
      <input type="tel" {...register('parentPhone')} required />

      <label>Contact Address</label>
      <textarea {...register('address')} required />

      <button type="submit">Next</button>
    </form>
  );
}