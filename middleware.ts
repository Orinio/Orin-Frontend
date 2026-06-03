import { NextRequest, NextResponse } from 'next/server';

const protectedRoutes = ['/dashboard', '/dashboard/settings', '/dashboard/opportunities', '/dashboard/sources'];
const apiRoutes = ['/api/proofs', '/api/sources', '/api/user', '/api/opportunities', '/api/notifications', '/api/coach-notes'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtectedPage = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + '/')
  );
  const isProtectedApi = apiRoutes.some(
    (route) => pathname.startsWith(route)
  );

  if (!isProtectedPage && !isProtectedApi) {
    return NextResponse.next();
  }

  const supabaseAccessToken = request.cookies.get('sb-access-token')?.value;
  const hasSession = !!supabaseAccessToken;

  if (!hasSession) {
    if (isProtectedPage) {
      const signInUrl = new URL('/signin', request.url);
      signInUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(signInUrl);
    }
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/api/proofs/:path*',
    '/api/sources/:path*',
    '/api/user/:path*',
    '/api/opportunities/:path*',
    '/api/notifications/:path*',
    '/api/coach-notes/:path*',
  ],
};
