'use client';

import { useForm } from 'react-hook-form';
import { useFormContext } from '@/context/MultiStepContext';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Step1PersonalInfo({ savedData }) {
  const { register, handleSubmit, setValue } = useForm();
  const { updatePersonalInfo } = useFormContext();
  const router = useRouter();
  const [preview, setPreview] = useState('');

  // Load saved data and passport preview
  useEffect(() => {
    if (savedData) {
      Object.entries(savedData).forEach(([key, value]) => {
        setValue(key, value);
        if (key === 'passportPreview') setPreview(value);
      });
    }
  }, [savedData, setValue]);

  const onSubmit = async (data) => {
    updatePersonalInfo({
      ...data,
      passportFile: data.passport[0],
      passportPreview: preview,
    });

    // Optionally save to backend here:
    await fetch('/api/form/save', { method: 'POST', body: JSON.stringify({ step: 1, data }) });

    router.push('/apply/step-2-health-info');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
      setValue('passport', [file]); // Update form hook
    };
    reader.readAsDataURL(file);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input {...register('fullName')} placeholder="Full Name" required />
      <input {...register('gender')} placeholder="Gender" required />
      <input {...register('email')} type="email" placeholder="Email" required />
      <input {...register('phone')} placeholder="Phone" required />
      <input {...register('contactAddress')} placeholder="Contact Address" required />
      <input {...register('dateOfBirth')} type="date" required />
      <input {...register('parentsName')} placeholder="Parent/Guardian Name" required />
      <input {...register('parentsContactAddress')} placeholder="Parent's Contact Address" required />

      <div>
        <label>Upload Passport Photo</label>
        <input
          type="file"
          accept="image/*"
          {...register('passport')}
          onChange={handleImageChange}
          required={!preview}
        />
        {preview && <img src={preview} alt="Preview" width={100} className="mt-2 rounded" />}
      </div>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Next
      </button>
    </form>
  );
}