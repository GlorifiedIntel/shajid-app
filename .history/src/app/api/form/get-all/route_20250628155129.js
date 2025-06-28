import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { connectToDB } from '@/lib/mongodb';
import Application from '@/models/Application';
import { NextResponse } from 'next/server';

export async function GET(req) {
  const session = await getServerSession(authOptions);
  if (!session) return new NextResponse('Unauthorized', { status: 401 });

  const step = new URL(req.url).searchParams.get('step');
  await connectToDB();
  const app = await Application.findOne({ userId: session.user.id });
  return NextResponse.json(app?.[`step${step}`] || {});
}