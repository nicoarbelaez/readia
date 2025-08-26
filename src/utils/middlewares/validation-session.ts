import { NextRequest, NextResponse } from "next/server";
import { redirectToLogin } from "@/utils/redirects";
import { getUserAuthStatus } from "@/utils/auth-status";

export async function validationSession(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  if (pathname.startsWith("/auth") || searchParams.get("error")) {
    return;
  }

  // Validamos autenticación
  const { error, isAuthenticated } = await getUserAuthStatus();

  if (error || !isAuthenticated) {
    // No autenticado -> enviar a login con next para volver luego
    return redirectToLogin({ request });
  }

  if (isAuthenticated && pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  if (!isAuthenticated) {
    return redirectToLogin({ request, error: "wrong_account_type" });
  }
}
