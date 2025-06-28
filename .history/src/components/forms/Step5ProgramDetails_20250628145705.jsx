'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFormData } from '@/context/FormContext';
import { useSession } from 'next-auth/react';

const schema = z.object({
  program: z.string().min(1, 'Select your preferred program'),
  mode: z.string().min(1, 'Choose full-time or part-time'),
  campus: z.string().min(1, 'Choose a campus'),
});

const programs = [
  'Basic Midwifery',
  'Community Midwifery',
  'Post Basic Nursing',
  'Mental Health Nursing',
];

const campuses = [
  'Main Campus',
  'Satellite Campus 1',
  'Satellite Campus 2',
];

export default function Step5ProgramDetails() {
  const { updateFormData } = useFormData();
  const { data: session } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (formValues) => {
    updateFormData('step5', formValues);

    await fetch('/api/apply/step-5', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: session?.user?.id,
        data: formValues,
      }),
    });

    // TODO: Go to step 6
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Program of Choice</label>
      <select {...register('program')}>
        <option value="">Select a program</option>
        {programs.map((p) => (
          <option key={p} value={p}>{p}</option>
        ))}
      </select>
      {errors.program && <p>{errors.program.message}</p>}

      <label>Mode of Study</label>
      <select {...register('mode')}>
        <option value="">Select mode</option>
        <option value="Full-time">Full-time</option>
        <option value="Part-time">Part-time</option>
      </select>
      {errors.mode && <p>{errors.mode.message}</p>}

      <label>Preferred Campus</label>
      <select {...register('campus')}>
        <option value="">Select campus</option>
        {campuses.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
      {errors.campus && <p>{errors.campus.message}</p>}

      <button type="submit">Next</button>
    </form>
  );
}