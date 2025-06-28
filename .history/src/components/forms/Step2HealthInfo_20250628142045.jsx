'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFormData } from '@/context/FormContext';
import { useSession } from 'next-auth/react';

const schema = z.object({
  chronicIllness: z.string().min(1, 'Required'),
  bloodGroup: z.string().min(1, 'Required'),
  genotype: z.string().min(1, 'Required'),
  emergencyContact: z.string().min(1, 'Required'),
});

export default function Step2HealthInfo() {
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
    updateFormData('step2', formValues);

    await fetch('/api/apply/step-2', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: session?.user?.id,
        data: formValues,
      }),
    });

    // Navigate to next step or show success toast
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Do you have any chronic illness?</label>
      <input {...register('chronicIllness')} />
      {errors.chronicIllness && <p>{errors.chronicIllness.message}</p>}

      <label>Blood Group</label>
      <input {...register('bloodGroup')} />
      {errors.bloodGroup && <p>{errors.bloodGroup.message}</p>}

      <label>Genotype</label>
      <input {...register('genotype')} />
      {errors.genotype && <p>{errors.genotype.message}</p>}

      <label>Emergency Contact</label>
      <input {...register('emergencyContact')} />
      {errors.emergencyContact && <p>{errors.emergencyContact.message}</p>}

      <button type="submit">Next</button>
    </form>
  );
}