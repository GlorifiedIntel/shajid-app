// /app/api/apply/step-4/route.js
import { connectToDB } from '@/lib/mongodb';
import Application from '@/models/Application';
import { NextResponse } from 'next/server';
import { z } from 'zod';

// Define subject result schema
const subjectSchema = z.object({
  subject: z.string().min(1, 'Subject is required'),
  grade: z.string().min(1, 'Grade is required'),
});

// Define exam sitting schema
const sittingSchema = z.object({
  examType: z.string().min(1, 'Exam type is required'),
  examYear: z
    .string()
    .regex(/^\d{4}$/, 'Exam year must be a 4-digit number'),
  examNumber: z
    .string()
    .min(5, 'Exam number must be at least 5 characters'),
  subjects: z
    .array(subjectSchema)
    .min(5, 'At least 5 subjects required'),
});

// Full step 4 schema (sitting1 required, sitting2 optional)
const step4Schema = z.object({
  sitting1: sittingSchema,
  sitting2: sittingSchema.optional(),
});

export async function POST(req) {
  const { userId, data } = await req.json();

  if (!userId) {
    return new NextResponse('Missing userId', { status: 400 });
  }

  const parsed = step4Schema.safeParse(data);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.format() }, { status: 422 });
  }

  try {
    await connectToDB();

    await Application.updateOne(
      { userId },
      { $set: { step4: parsed.data } },
      { upsert: true }
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Step 4 DB error:', err);
    return new NextResponse('Database error', { status: 500 });
  }
}