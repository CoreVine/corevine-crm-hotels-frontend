import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  /* if (request.nextUrl.pathname.startsWith("/dashboard")) {
    const user = await getUser()
    if (!user) {
      return NextResponse.redirect(new URL("/login", request.url))
    }
  } */
  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)"]
}
