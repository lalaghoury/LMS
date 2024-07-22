import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import axios from "axios";

export async function middleware(req: NextRequest, res: NextResponse) {
  const token = req.cookies.get("auth")?.value || null;

  // Set Authorization header if token is present
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
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
      if (req.nextUrl.pathname.startsWith("/auth")) {
        return NextResponse.redirect(new URL("/", req.url));
      }
      return NextResponse.next();
    }
  } catch (error: any) {
    if (
      error.response.data.message ===
      "You are not authorized to perform this action"
    ) {
      return NextResponse.redirect(
        new URL(
          `/batches/${apiPath === "/teaching" ? "enrolled" : "teaching"}`,
          req.url
        )
      );
    }
    if (!req.nextUrl.pathname.startsWith("/auth")) {
      return NextResponse.redirect(new URL("/auth/sign-in", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
