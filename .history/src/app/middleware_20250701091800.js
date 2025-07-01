// app/middleware.js
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

const protectedSteps = [
  '/apply/step-1',
  '/apply/step-2',
  '/apply/step-3',
  '/apply/step-4',
  '/apply/step-5',
  '/apply/step-6',
  '/apply/step-7-review',
];

export async function middleware(request) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  const url = request.nextUrl.pathname;

  if (protectedSteps.some(path => url.startsWith(path))) {
    if (!token) {
      return NextResponse.redirect(new URL('/auth/sign-in', request.url));
    }

    // Role check (optional — customize as needed)
    const requiredRole = 'applicant';
    if (token.role !== requiredRole) {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
  }

  return NextResponse.next();
}

// This middleware applies to specific application steps
export const config = {
  matcher: [
    '/apply/step-1',
    '/apply/step-2',
    '/apply/step-3',
    '/apply/step-4',
    '/apply/step-5',
    '/apply/step-6',
    '/apply/step-7-review',
  ],
};