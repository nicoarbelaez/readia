import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

/**
 * Middleware para manejar redirecciones en la ruta raíz ('/')
 *
 * Comportamiento:
 * 1. Si el usuario está autenticado:
 *    - Si hay un parámetro 'next', redirige a esa URL
 *    - Si no hay 'next', redirige a '/home'
 * 2. Si el usuario no está autenticado:
 *    - Permite el acceso a la ruta raíz
 *
 * @param request - La solicitud entrante de Next.js
 * @returns NextResponse si se requiere redirección, undefined si no
 */
export async function rootRedirect(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // Solo procesamos la ruta raíz
  if (pathname !== "/") {
    return;
  }

  // Verificamos si el usuario está autenticado
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Si no hay usuario autenticado, permitimos el acceso a la ruta raíz
  if (!user) {
    return NextResponse.next();
  }

  // Si hay usuario autenticado, determinamos la URL de redirección
  const nextUrl = searchParams.get("next");
  const redirectUrl = nextUrl || "/home";

  // Construimos y retornamos la redirección
  return NextResponse.redirect(new URL(redirectUrl, request.url));
}
