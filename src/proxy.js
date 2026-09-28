import { NextResponse } from 'next/server';
import { SESSION_COOKIE, LOGIN_PATH, ADMIN_HOME } from '@/lib/auth/constants';
import { verifySession } from '@/lib/auth/jwt';

// Optimistic auth check for the admin area. Every admin page and Server Action
// also re-validates the session against the database (see requireAdmin()).
export async function proxy(request) {
  const { pathname } = request.nextUrl;
  const session = await verifySession(request.cookies.get(SESSION_COOKIE)?.value);
  const isLoginPage = pathname === LOGIN_PATH;

  if (!session && !isLoginPage) {
    const url = new URL(LOGIN_PATH, request.url);
    url.searchParams.set('next', pathname);
    return NextResponse.redirect(url);
  }
  if (session && isLoginPage) {
    return NextResponse.redirect(new URL(ADMIN_HOME, request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],
};
