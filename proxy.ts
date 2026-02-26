import { NextRequest, NextResponse } from "next/server"
import { headers } from "next/headers"
import { auth } from "@/utils/auth"
import { Role } from "@/constants/role"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (!pathname.startsWith("/admin")) {
    return NextResponse.next()
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (session?.user.role !== Role.Administrator) {
    return new NextResponse("You do not have permission to access this page.", {
      status: 403,
    })
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
