import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

export function withAuth(PageComponent) {
  return async function AuthenticatedPage(props) {
    const session = await getServerSession(authOptions);
    if (!session) redirect('/auth/login');

    return await PageComponent({ ...props, session });
  };
}