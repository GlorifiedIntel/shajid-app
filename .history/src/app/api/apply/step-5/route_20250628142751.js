import { connectToDB } from '@/lib/mongodb';
import Application from '@/models/Application';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const { userId, data } = await req.json();

  if (!userId) return new NextResponse('Missing userId', { status: 400 });

  try {
    await connectToDB();

    await Application.updateOne(
      { userId },
      { $set: { step5: data } },
      { upsert: true }
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    return new NextResponse('Database error', { status: 500 });
  }
}