'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFormData } from '@/context/FormContext';
import { useSession } from 'next-auth/react';

const schema = z.object({
  jambRegNo: z.string().min(6, 'Enter a valid JAMB Reg Number'),
  jambScore: z.number().min(0).max(400),
  jambSubjects: z
    .array(z.string().min(1))
    .min(4, 'Select 4 subjects')
    .max(4, 'Only 4 subjects allowed'),
});

const jambSubjectOptions = [
  'English',
  'Biology',
  'Chemistry',
  'Physics',
  'Mathematics',
  'Economics',
  'Government',
  'Geography',
  'Literature in English',
  'Christian Religious Studies',
  'Islamic Religious Studies',
  'Agricultural Science',
  'Commerce',
];

export default function Step6UTMEInfo() {
  const { updateFormData } = useFormData();
  const { data: session } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      jambSubjects: [],
    },
  });

  const selectedSubjects = watch('jambSubjects', []);

  const onSubmit = async (formValues) => {
    updateFormData('step6', formValues);

    await fetch('/api/apply/step-6', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: session?.user?.id,
        data: formValues,
      }),
    });

    // TODO: Go to step 7
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>JAMB Registration Number</label>
      <input {...register('jambRegNo')} />
      {errors.jambRegNo && <p>{errors.jambRegNo.message}</p>}

      <label>JAMB Total Score</label>
      <input type="number" {...register('jambScore', { valueAsNumber: true })} />
      {errors.jambScore && <p>{errors.jambScore.message}</p>}

      <label>JAMB Subject Combination (Select 4)</label>
      <div className="subject-grid">
        {jambSubjectOptions.map((subj) => (
          <label key={subj}>
            <input
              type="checkbox"
              value={subj}
              {...register('jambSubjects')}
              disabled={!selectedSubjects.includes(subj) && selectedSubjects.length >= 4}
            />
            {subj}
          </label>
        ))}
      </div>
      {errors.jambSubjects && <p>{errors.jambSubjects.message}</p>}

      <button type="submit">Next</button>
    </form>
  );
}