import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { redirectToLogin } from "@/utils/redirects";

export async function validationSession(request: NextRequest) {
  const nextUrl = request.nextUrl;
  if (
    nextUrl.pathname.startsWith("/auth") ||
    nextUrl.searchParams.get("error")
  ) {
    return;
  }

  // Ahora validamos autenticación
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    // No autenticado -> enviar a login con next para volver luego
    return redirectToLogin({ request });
  }

  if (user && nextUrl.pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  if (!user) {
    return redirectToLogin({ request, error: "wrong_account_type" });
  }
}
