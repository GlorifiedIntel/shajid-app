'use client';

import { useForm } from 'react-hook-form';

export default function Step5ProgramDetails() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log('Step 5 data:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Program Applied For</label>
      <select {...register('program')} required>
        <option value="">-- Select --</option>
        <option value="basic-nursing">Basic Nursing</option>
        <option value="basic-midwifery">Basic Midwifery</option>
        <option value="post-basic-nursing">Post Basic Nursing</option>
        <option value="community-midwifery">Community Midwifery</option>
        <option value="mental-health-nursing">Mental Health Nursing</option>
      </select>

      <label>Preferred Study Mode</label>
      <select {...register('studyMode')} required>
        <option value="full-time">Full-time</option>
        <option value="part-time">Part-time</option>
      </select>

      <button type="submit">Next</button>
    </form>
  );
}