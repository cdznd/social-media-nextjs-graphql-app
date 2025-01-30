import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if the request is for the root URL
  if (request.nextUrl.pathname === '/') {
    // Redirect to /app
    return NextResponse.redirect(new URL('/app', request.url));
  }

  // Continue with the request
  return NextResponse.next();
}

// Optional: Match specific paths
export const config = {
  matcher: '/', // Only run middleware for the root URL
};