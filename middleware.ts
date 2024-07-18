import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import axios from "axios";

export async function middleware(req: NextRequest, res: NextResponse) {
  try {
    const token = req.cookies.get("auth");

    axios.defaults.headers.common["Authorization"] = `Bearer ${token?.value}`;

    axios.defaults.withCredentials = true;

    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/verify`
    );

    if (data.success) {
      if (
        req.nextUrl.pathname === "/" ||
        req.nextUrl.pathname.startsWith("/auth")
      ) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
    }
  } catch (error: any) {
    if (req.nextUrl.pathname.startsWith("/auth")) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/auth/sign-in", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:route*", "/auth/:route*", "/"],
};
