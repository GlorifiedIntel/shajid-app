// src/lib/withRole.js
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

/**
 * Wraps a page component and only allows users with allowedRoles to access it.
 * Redirects unauthorized users to the login page.
 */
export function withRole(Component, allowedRoles = []) {
  return async function Page(props) {
    const session = await getServerSession(authOptions);
    if (!session || !allowedRoles.includes(session.user.role)) {
      return redirect('/auth/sign-in');
    }
    return <Component {...props} />;
  };
}
