// /app/api/apply/step-1/route.js
import { connectToDB } from '@/lib/mongodb';
import Application from '@/models/Application';
import { NextResponse } from 'next/server';
import { z } from 'zod';

// ✅ Define the Zod schema for step 1 (personalInfo)
const personalInfoSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  gender: z.string().min(1, 'Gender is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number is required'),
  contactAddress: z.string().min(1, 'Contact address is required'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  parentsName: z.string().min(1, 'Parents name is required'),
  parentsContactAddress: z.string().min(1, 'Parents contact address is required'),
  passportUrl: z.string().url('Invalid passport URL'), // or z.string().optional() if uploaded later
});

export async function POST(req) {
  const { userId, data } = await req.json();

  if (!userId) {
    return new NextResponse('Missing userId', { status: 400 });
  }

  const parseResult = personalInfoSchema.safeParse(data);

  if (!parseResult.success) {
    return NextResponse.json({ error: parseResult.error.format() }, { status: 422 });
  }

  try {
    await connectToDB();

    await Application.updateOne(
      { userId },
      { $set: { step1: parseResult.data } },
      { upsert: true }
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Step 1 DB error:', err);
    return new NextResponse('Database error', { status: 500 });
  }
}