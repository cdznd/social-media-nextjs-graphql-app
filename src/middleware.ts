import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const isAuthenticated = !!token;

  const { pathname } = request.nextUrl;

  const publicPaths = ['/sign-in', '/sign-up', '/home', '/api/auth/signin', '/api/auth/signup'];
  const isPublicPath = publicPaths.some(path => request.nextUrl.pathname.startsWith(path));

  if (pathname.startsWith('/api/graphql')) {
    return NextResponse.next();
  }

  if (!isAuthenticated && !isPublicPath && pathname !== '/home') {
    return NextResponse.redirect(new URL('/home', request.url));
  }

  if (isAuthenticated && isPublicPath) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  try {
    const response = NextResponse.next();
    if (response.status === 404) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return response;
  } catch {
    return NextResponse.redirect(new URL('/', request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - api/auth (NextAuth routes)
     */
    '/((?!_next/static|_next/image|favicon.ico|api/auth).*)',
  ],
}
