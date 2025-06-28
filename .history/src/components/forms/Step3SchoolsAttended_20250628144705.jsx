'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFormData } from '@/context/FormContext';
import { useSession } from 'next-auth/react';

const schema = z.object({
  primarySchool: z.string().min(1, 'Primary School name is required'),
  secondarySchool: z.string().min(1, 'Secondary School name is required'),
  otherInstitutions: z.string().optional(),
});

export default function Step3SchoolsAttended() {
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
    updateFormData('step3', formValues);

    await fetch('/api/apply/step-3', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: session?.user?.id,
        data: formValues,
      }),
    });

    // TODO: Redirect to Step 4
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Primary School Attended</label>
      <input {...register('primarySchool')} />
      {errors.primarySchool && <p>{errors.primarySchool.message}</p>}

      <label>Secondary School Attended</label>
      <input {...register('secondarySchool')} />
      {errors.secondarySchool && <p>{errors.secondarySchool.message}</p>}

      <label>Other Institutions (if any)</label>
      <textarea {...register('otherInstitutions')} />

      <button type="submit">Next</button>
    </form>
  );
}