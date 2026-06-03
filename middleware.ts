import { NextRequest, NextResponse } from 'next/server';

const protectedRoutes = [
  '/dashboard',
  '/settings',
  '/api/proofs',
  '/api/proof',
  '/api/sources',
  '/api/user',
  '/api/opportunities',
  '/api/notifications',
  '/api/coach-notes',
  '/api/contact',
];

const authRoutes = ['/signin', '/signup', '/reset-password'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtectedRoute = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + '/')
  );
  const isAuthRoute = authRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + '/')
  );
  const isApiRoute = pathname.startsWith('/api/');

  const supabaseAccessToken = request.cookies.get('sb-access-token')?.value;
  const hasSession = !!supabaseAccessToken;

  if (!hasSession && isProtectedRoute) {
    if (isApiRoute) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const signInUrl = new URL('/signin', request.url);
    signInUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(signInUrl);
  }

  if (hasSession && isAuthRoute) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/settings/:path*',
    '/signin',
    '/signup',
    '/reset-password',
    '/api/proofs/:path*',
    '/api/proof/:path*',
    '/api/sources/:path*',
    '/api/user/:path*',
    '/api/opportunities/:path*',
    '/api/notifications/:path*',
    '/api/coach-notes/:path*',
    '/api/contact/:path*',
  ],
};
