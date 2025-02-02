import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import axios from "axios";

export async function middleware(req: NextRequest, res: NextResponse) {
  const token = req.cookies.get("auth")?.value || null;

  // Set Authorization header if token is present
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  if (!token && req.nextUrl.pathname.startsWith("/auth")) {
    return NextResponse.next();
  } else if (!token && !req.nextUrl.pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/auth/sign-in", req.url));
  }

  axios.defaults.withCredentials = true;

  const { pathname } = req.nextUrl;

  // Determine API path based on pathname
  let apiPath = "/login"; // Default to login path

  if (pathname.startsWith("/batches/enrolled")) {
    apiPath = "/enrolled";
  } else if (pathname.startsWith("/batches/teaching")) {
    apiPath = "/teaching";
  }

  const batchId = pathname.split("/")[3];

  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/verify${apiPath}`,
      { batchId }
    );

    if (data.success) {
      // User is authorized
      if (pathname.startsWith("/auth")) {
        return NextResponse.redirect(new URL("/", req.url));
      }
      return NextResponse.next();
    }
  } catch (error: any) {
    // Handle authorization error
    if (
      error.response &&
      error.response.data &&
      error.response.data.message ===
        "You are not authorized to perform this action"
    ) {
      // Redirect to appropriate batch path
      return NextResponse.redirect(new URL(`/batches${apiPath}`, req.url));
    }

    // Default to redirect to sign-in if not authorized and not in /auth path
    if (!pathname.startsWith("/auth")) {
      return NextResponse.redirect(new URL("/auth/sign-in", req.url));
    }
  }

  // Continue to next if none of the conditions were met
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
