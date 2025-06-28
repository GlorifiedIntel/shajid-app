'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFormData } from '@/context/FormContext';
import { useSession } from 'next-auth/react';

const schema = z.object({
  chronicIllness: z.string().min(1, 'Please describe or enter "None"'),
  bloodGroup: z.string().min(1, 'Blood group is required'),
  genotype: z.string().min(1, 'Genotype is required'),
  emergencyContact: z.string().min(1, 'Emergency contact is required'),
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
    // Save to context
    updateFormData('step2', formValues);

    // Save to MongoDB
    await fetch('/api/apply/step-2', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: session?.user?.id,
        data: formValues,
      }),
    });

    // TODO: Route to Step 3 (use router.push if needed)
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Do you have any chronic illness?</label>
      <input {...register('chronicIllness')} />
      {errors.chronicIllness && <p>{errors.chronicIllness.message}</p>}

      <label>Blood Group</label>
      <select {...register('bloodGroup')}>
        <option value="">Select...</option>
        <option value="A+">A+</option>
        <option value="A−">A−</option>
        <option value="B+">B+</option>
        <option value="B−">B−</option>
        <option value="AB+">AB+</option>
        <option value="AB−">AB−</option>
        <option value="O+">O+</option>
        <option value="O−">O−</option>
      </select>
      {errors.bloodGroup && <p>{errors.bloodGroup.message}</p>}

      <label>Genotype</label>
      <select {...register('genotype')}>
        <option value="">Select...</option>
        <option value="AA">AA</option>
        <option value="AS">AS</option>
        <option value="SS">SS</option>
        <option value="AC">AC</option>
        <option value="SC">SC</option>
      </select>
      {errors.genotype && <p>{errors.genotype.message}</p>}

      <label>Emergency Contact Number</label>
      <input {...register('emergencyContact')} />
      {errors.emergencyContact && <p>{errors.emergencyContact.message}</p>}

      <button type="submit">Next</button>
    </form>
  );
}