'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFormContext } from '@/context/MultiStepContext';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const schema = z.object({
  primarySchool: z.string().min(1, 'Primary School name is required'),
  secondarySchool: z.string().min(1, 'Secondary School name is required'),
  otherInstitutions: z.string().optional(),
});

export default function Step3SchoolsAttended() {
  const { updateSchoolsAttended } = useFormContext();
  const { data: session } = useSession();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (formValues) => {
    // ✅ Update form context
    updateSchoolsAttended(formValues);

    // ✅ Optionally save to API
    await fetch('/api/apply/step-3', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: session?.user?.id,
        data: formValues,
      }),
    });

    // ✅ Go to Step 4
    router.push('/apply/step-4-exam-results');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label>Primary School Attended</label>
        <input {...register('primarySchool')} />
        {errors.primarySchool && <p className="text-red-500">{errors.primarySchool.message}</p>}
      </div>

      <div>
        <label>Secondary School Attended</label>
        <input {...register('secondarySchool')} />
        {errors.secondarySchool && <p className="text-red-500">{errors.secondarySchool.message}</p>}
      </div>

      <div>
        <label>Other Institutions (if any)</label>
        <textarea {...register('otherInstitutions')} />
      </div>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Next
      </button>
    </form>
  );
}