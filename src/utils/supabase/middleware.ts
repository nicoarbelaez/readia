import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // No ejecutes código entre createServerClient y
  // supabase.auth.getUser(). Un pequeño error podría dificultar
  // depurar problemas por los que los usuarios sean desconectados aleatoriamente.

  // IMPORTANTE: NO ELIMINES auth.getUser()

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const requestUrl = request.nextUrl;
  const pathname = requestUrl.pathname + requestUrl.search;

  // Si el usuario no está autenticado y no accede a /login ni a /auth, redirigir a login.
  if (
    !user &&
    !pathname.startsWith("/login") &&
    !pathname.startsWith("/auth")
  ) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Si el usuario ya está autenticado y accede a /login, enviarlo al home.
  if (user && pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // IMPORTANTE: Debes devolver el objeto supabaseResponse tal como está.
  // Si estás creando un nuevo objeto de respuesta con NextResponse.next(), asegúrate de:
  // 1. Pasar la request en él, así:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copiar las cookies, así:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Modificar el objeto myNewResponse según tus necesidades, pero sin cambiar
  //    las cookies!
  // 4. Finalmente:
  //    return myNewResponse
  // Si no se hace esto, podrías causar una desincronización entre el navegador y el servidor
  // y terminar la sesión del usuario prematuramente!

  return supabaseResponse;
}
