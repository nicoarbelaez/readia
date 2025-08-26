import { NextRequest, NextResponse } from "next/server";

interface RedirectToLoginParams {
  request: NextRequest;
  error?: string;
}

export const redirectToLogin = ({ request, error }: RedirectToLoginParams) => {
  const { pathname, search } = request.nextUrl;

  if (pathname.startsWith("/login")) {
    return;
  }

  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("next", pathname + search);

  if (error) {
    loginUrl.searchParams.set("error", error);
  }

  return NextResponse.redirect(loginUrl);
};
