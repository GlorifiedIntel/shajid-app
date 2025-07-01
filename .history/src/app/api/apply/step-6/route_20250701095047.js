// /app/api/apply/step-6/route.js
import { connectToDB } from '@/lib/mongodb';
import Application from '@/models/Application';
import { NextResponse } from 'next/server';
import { z } from 'zod';

// Define validation schema
const step6Schema = z.object({
  jambRegNo: z
    .string()
    .min(6, 'JAMB Registration Number is required')
    .max(20, 'JAMB Reg No seems too long'),
  jambScore: z
    .number({ invalid_type_error: 'JAMB Score must be a number' })
    .min(0, 'Score cannot be less than 0')
    .max(400, 'Maximum JAMB score is 400'),
  jambSubjects: z
    .array(z.string().min(1))
    .min(4, 'Select 4 subjects')
    .max(4, 'Only 4 subjects allowed'),
});

export async function POST(req) {
  const { userId, data } = await req.json();

  if (!userId) {
    return new NextResponse('Missing userId', { status: 400 });
  }

  const parsed = step6Schema.safeParse(data);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.format() }, { status: 422 });
  }

  try {
    await connectToDB();

    await Application.updateOne(
      { userId },
      { $set: { step6: parsed.data } },
      { upsert: true }
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Step 6 DB error:', err);
    return new NextResponse('Database error', { status: 500 });
  }
}