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
      // if (req.nextUrl.pathname === "/") {
      //   return NextResponse.rewrite(new URL("/dashboard", req.url));
      // }
      return;
    }
  } catch (error: any) {
    return NextResponse.redirect(new URL("/auth/sign-in", req.url));
  }

  return NextResponse.next();
}

export const config = {
  // matcher: ["/dashboard/:route*", "/", "/auth/:route*"],
  matcher: ["/dashboard/:route*"],
};
