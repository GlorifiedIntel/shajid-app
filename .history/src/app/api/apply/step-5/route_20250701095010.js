// /app/api/apply/step-5/route.js
import { connectToDB } from '@/lib/mongodb';
import Application from '@/models/Application';
import { NextResponse } from 'next/server';
import { z } from 'zod';

// Define validation schema
const step5Schema = z.object({
  program: z.string().min(1, 'Program selection is required'),
  mode: z.enum(['Full-time', 'Part-time']),
  campus: z.string().min(1, 'Campus selection is required'),
});

export async function POST(req) {
  const { userId, data } = await req.json();

  if (!userId) {
    return new NextResponse('Missing userId', { status: 400 });
  }

  const parsed = step5Schema.safeParse(data);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.format() }, { status: 422 });
  }

  try {
    await connectToDB();

    await Application.updateOne(
      { userId },
      { $set: { step5: parsed.data } },
      { upsert: true }
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Step 5 DB error:', err);
    return new NextResponse('Database error', { status: 500 });
  }
}