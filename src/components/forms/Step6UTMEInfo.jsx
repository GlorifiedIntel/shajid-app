'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFormContext } from '@/context/MultiStepContext'; // ✅ Correct hook
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

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

export default function Step6UTMEInfo({ savedData }) {
  const { updateUTMEInfo } = useFormContext(); // ✅ Correct updater
  const { data: session } = useSession();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: savedData || {
      jambRegNo: '',
      jambScore: '',
      jambSubjects: [],
    },
  });

  useEffect(() => {
    if (savedData) {
      Object.entries(savedData).forEach(([key, value]) => {
        setValue(key, value);
      });
    }
  }, [savedData, setValue]);

  const selectedSubjects = watch('jambSubjects', []);

  const onSubmit = async (formValues) => {
    updateUTMEInfo(formValues); // ✅ Save in context

    await fetch('/api/apply/step-6', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: session?.user?.id,
        data: formValues,
      }),
    });

    router.push('/apply/step-7-review');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-step">
      <label>JAMB Registration Number</label>
      <input {...register('jambRegNo')} />
      {errors.jambRegNo && <p className="error">{errors.jambRegNo.message}</p>}

      <label>JAMB Total Score</label>
      <input type="number" {...register('jambScore', { valueAsNumber: true })} />
      {errors.jambScore && <p className="error">{errors.jambScore.message}</p>}

      <label>JAMB Subject Combination (Select 4)</label>
      <div className="subject-grid">
        {jambSubjectOptions.map((subj) => (
          <label key={subj}>
            <input
              type="checkbox"
              value={subj}
              {...register('jambSubjects')}
              disabled={
                !selectedSubjects.includes(subj) && selectedSubjects.length >= 4
              }
            />
            {subj}
          </label>
        ))}
      </div>
      {errors.jambSubjects && <p className="error">{errors.jambSubjects.message}</p>}

      <button type="submit">Next</button>
    </form>
  );
}