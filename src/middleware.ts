import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
export default withAuth(
  function middleware(request: NextRequestWithAuth) {
    if (request.nextUrl.pathname.startsWith("/interview")) {
      return NextResponse.next();
    }
    if (
      request.nextUrl.pathname.startsWith("/employer") &&
      (request.nextauth?.token?.data as any)?.infoUser?.roles[0]?.roleName !==
        "EMPLOYER"
    ) {
      return NextResponse.rewrite(new URL("/denied", request.url));
    }
    if (
      !request.nextUrl.pathname.startsWith("/employer") &&
      (request.nextauth?.token?.data as any)?.infoUser?.roles[0]?.roleName ===
        "EMPLOYER"
    ) {
      return NextResponse.rewrite(new URL("/employer/setting", request.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  },
);

export const config = {
  matcher: [
    "/employer/:path*",
    "/user/:path*",
    "/qna",
    "/contact/:path*",
    "/interview/:path*",
  ],
};
// export const config = { matcher: [] };
