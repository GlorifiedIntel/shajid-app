'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFormData } from '@/context/FormContext';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

const schema = z.object({
  fullName: z.string().min(1),
  dob: z.string().min(1),
  address: z.string().min(1),
  parentsName: z.string().min(1),
  parentsContact: z.string().min(1),
});

export default function Step1PersonalInfo() {
  const { data: session } = useSession();
  const { updateFormData } = useFormData();
  const [passportPreview, setPassportPreview] = useState(null);
  const [passportFile, setPassportFile] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPassportFile(file);
      setPassportPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (formValues) => {
    let fileId = null;

    if (passportFile) {
      const uploadForm = new FormData();
      uploadForm.append('passport', passportFile);
      uploadForm.append('userId', session?.user?.id);

      const res = await fetch('/api/upload/passport', {
        method: 'POST',
        body: uploadForm,
      });

      const uploadResult = await res.json();
      fileId = uploadResult.fileId;
    }

    const payload = { ...formValues, passportFileId: fileId };
    updateFormData('step1', payload);

    await fetch('/api/apply/step-1', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: session?.user?.id,
        data: payload,
      }),
    });

    // move to step 2
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Full Name</label>
      <input {...register('fullName')} />
      {errors.fullName && <p>{errors.fullName.message}</p>}

      <label>Date of Birth</label>
      <input type="date" {...register('dob')} />
      {errors.dob && <p>{errors.dob.message}</p>}

      <label>Contact Address</label>
      <textarea {...register('address')} />
      {errors.address && <p>{errors.address.message}</p>}

      <label>Parents' Name</label>
      <input {...register('parentsName')} />
      {errors.parentsName && <p>{errors.parentsName.message}</p>}

      <label>Parents' Contact Address</label>
      <input {...register('parentsContact')} />
      {errors.parentsContact && <p>{errors.parentsContact.message}</p>}

      <label>Passport Photograph</label>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {passportPreview && <img src={passportPreview} alt="Preview" width={100} />}

      <button type="submit">Next</button>
    </form>
  );
}