import { createClient } from "@/utils/supabase/server";

import { User } from "@supabase/supabase-js";

export interface AuthResult {
  user: User | null;
  error: Error | null;
  isAuthenticated: boolean;
}

/**
 * Verifica el estado de autenticación del usuario actual
 *
 * @returns {Promise<AuthResult>} Objeto con el estado de autenticación
 * - user: El objeto usuario si está autenticado, null si no
 * - error: Error de autenticación si existe
 * - isAuthenticated: Boolean que indica si el usuario está autenticado
 *
 * @example
 * const { user, error, isAuthenticated } = await getUserAuthStatus();
 *
 * if (error) {
 *   // Manejar error
 * }
 *
 * if (isAuthenticated) {
 *   // Usuario autenticado
 * } else {
 *   // Usuario no autenticado
 * }
 */
export async function getUserAuthStatus(): Promise<AuthResult> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    return {
      user,
      error,
      isAuthenticated: !error && !!user,
    };
  } catch (error) {
    return {
      user: null,
      error: error as Error,
      isAuthenticated: false,
    };
  }
}
