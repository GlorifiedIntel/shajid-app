import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

/**
 * Protects a page with authentication and optional role check.
 * @param {React.ComponentType} PageComponent - The page to protect.
 * @param {Object} options - Options object.
 * @param {string|string[]} options.role - Optional role or roles allowed (e.g. 'admin' or ['admin', 'staff']).
 */
export function withAuth(PageComponent, options = {}) {
  return async function AuthenticatedPage(props) {
    const session = await getServerSession(authOptions);

    if (!session) {
      return redirect('/auth/sign-in');
    }

    const userRole = session.user?.role;
    const requiredRoles = Array.isArray(options.role) ? options.role : [options.role];

    // If role restriction is set, and current role not allowed — redirect
    if (options.role && !requiredRoles.includes(userRole)) {
      return redirect('/unauthorized'); // Create this page or change path
    }

    return <PageComponent {...props} session={session} />;
  };
}