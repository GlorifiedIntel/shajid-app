// lib/withAuth.js
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

export async function withAuth(callback) {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/auth/login');
  return callback(session);
}