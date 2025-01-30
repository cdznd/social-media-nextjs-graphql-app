import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/app", request.url));
  }
  if (request.nextUrl.pathname === "/api/graphql") {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/api/graphql"], // Apply middleware to both "/" and "/api/graphql"
};
