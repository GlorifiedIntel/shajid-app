
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { connectToDB } from '@/lib/mongodb';
import Application from '@/models/Applicant';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return new Response('Unauthorized', { status: 401 });
  }

  await connectToDB();

  const record = await Application.findOne({ userId: session.user.id });
  if (!record) {
    return new Response(JSON.stringify(null), { status: 204 });
  }

  return new Response(JSON.stringify(record), { status: 200 });
}