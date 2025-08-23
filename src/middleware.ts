import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";
import { validationSession } from "@/utils/middlewares/validation-session";

export async function middleware(request: NextRequest) {
  // handlers: deben devolver NextResponse SOLO si quieren terminar la request
  const handlers = [
    validationSession,
    updateSession, // actualiza/propaga session cookies (último)
  ];

  for (const handler of handlers) {
    const result = await handler(request);
    // Sólo si result es un NextResponse con intención de terminar,
    // devolvemos y paramos la cadena. Si el handler devolvió undefined,
    // seguimos con siguiente handler.
    if (result instanceof NextResponse) {
      return result;
    }
  }

  // Si ningún handler devolvió un NextResponse terminante, continuamos.
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif)$).*)",
  ],
};
