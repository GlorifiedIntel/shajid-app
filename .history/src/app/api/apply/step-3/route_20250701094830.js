// /app/api/apply/step-3/route.js
import { connectToDB } from '@/lib/mongodb';
import Application from '@/models/Application';
import { NextResponse } from 'next/server';
import { z } from 'zod';

// Define the schema for schoolsAttended
const schoolsAttendedSchema = z.object({
  primarySchool: z.string().min(1, 'Primary school name is required'),
  secondarySchool: z.string().min(1, 'Secondary school name is required'),
  otherInstitutions: z.string().optional(),
});

export async function POST(req) {
  const { userId, data } = await req.json();

  if (!userId) {
    return new NextResponse('Missing userId', { status: 400 });
  }

  const parseResult = schoolsAttendedSchema.safeParse(data);

  if (!parseResult.success) {
    return NextResponse.json({ error: parseResult.error.format() }, { status: 422 });
  }

  try {
    await connectToDB();

    await Application.updateOne(
      { userId },
      { $set: { step3: parseResult.data } },
      { upsert: true }
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Step 3 DB error:', err);
    return new NextResponse('Database error', { status: 500 });
  }
}