'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFormData } from '@/context/FormContext';
import { useSession } from 'next-auth/react';
import { examSubjects } from '@/constants/subjects';

const subjectSchema = z.object({
  subject: z.string().min(1),
  grade: z.string().min(1),
});

const sittingSchema = z.object({
  examType: z.string().min(1),
  examYear: z.string().min(4),
  examNumber: z.string().min(5),
  subjects: z.array(subjectSchema).min(5, 'At least 5 subjects required'),
});

const schema = z.object({
  sitting1: sittingSchema,
  sitting2: sittingSchema.optional(), // second sitting optional
});

export default function Step4ExamResults() {
  const { updateFormData } = useFormData();
  const { data: session } = useSession();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      sitting1: { subjects: Array(5).fill({ subject: '', grade: '' }) },
      sitting2: { subjects: Array(5).fill({ subject: '', grade: '' }) },
    },
  });

  const {
    fields: subjects1,
    append: append1,
    remove: remove1,
  } = useFieldArray({ control, name: 'sitting1.subjects' });

  const {
    fields: subjects2,
    append: append2,
    remove: remove2,
  } = useFieldArray({ control, name: 'sitting2.subjects' });

  const onSubmit = async (formValues) => {
    updateFormData('step4', formValues);

    await fetch('/api/apply/step-4', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: session?.user?.id,
        data: formValues,
      }),
    });

    // TODO: Go to step 5
  };

  const gradeOptions = ['A1', 'B2', 'B3', 'C4', 'C5', 'C6', 'D7', 'E8', 'F9'];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>Sitting 1</h3>
      <label>Exam Type</label>
      <select {...register('sitting1.examType')}>
        <option value="">Select</option>
        <option value="WAEC">WAEC</option>
        <option value="NECO">NECO</option>
        <option value="NABTEB">NABTEB</option>
      </select>

      <label>Exam Year</label>
      <input type="text" {...register('sitting1.examYear')} />

      <label>Exam Number</label>
      <input type="text" {...register('sitting1.examNumber')} />

      {subjects1.map((field, index) => (
        <div key={field.id}>
          <label>Subject {index + 1}</label>
          <select {...register(`sitting1.subjects.${index}.subject`)}>
            <option value="">Select</option>
            {examSubjects.map((subject) => (
              <option key={subject} value={subject}>{subject}</option>
            ))}
          </select>

          <select {...register(`sitting1.subjects.${index}.grade`)}>
            <option value="">Grade</option>
            {gradeOptions.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
          {index >= 5 && <button type="button" onClick={() => remove1(index)}>Remove</button>}
        </div>
      ))}

      <button type="button" onClick={() => append1({ subject: '', grade: '' })}>Add Subject</button>

      <hr />

      <h3>Sitting 2 (Optional)</h3>
      <label>Exam Type</label>
      <select {...register('sitting2.examType')}>
        <option value="">Select</option>
        <option value="WAEC">WAEC</option>
        <option value="NECO">NECO</option>
        <option value="NABTEB">NABTEB</option>
      </select>

      <label>Exam Year</label>
      <input type="text" {...register('sitting2.examYear')} />

      <label>Exam Number</label>
      <input type="text" {...register('sitting2.examNumber')} />

      {subjects2.map((field, index) => (
        <div key={field.id}>
          <label>Subject {index + 1}</label>
          <select {...register(`sitting2.subjects.${index}.subject`)}>
            <option value="">Select</option>
            {examSubjects.map((subject) => (
              <option key={subject} value={subject}>{subject}</option>
            ))}
          </select>

          <select {...register(`sitting2.subjects.${index}.grade`)}>
            <option value="">Grade</option>
            {gradeOptions.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>

          <button type="button" onClick={() => remove2(index)}>Remove</button>
        </div>
      ))}

      <button type="button" onClick={() => append2({ subject: '', grade: '' })}>Add Subject</button>

      <br /><br />
      <button type="submit">Next</button>
    </form>
  );
}