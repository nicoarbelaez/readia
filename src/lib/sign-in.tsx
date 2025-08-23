import { createClient } from "@/utils/supabase/client";

// Cliente supabase
const supabase = createClient();

// Login con Google
export const signInWithGoogle = async (next?: string) => {
  const redirectTo = buildRedirectUrl(next);
  await supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo },
  });
};

// Login con GitHub
export const signInWithGitHub = async (next?: string) => {
  const redirectTo = buildRedirectUrl(next);
  await supabase.auth.signInWithOAuth({
    provider: "github",
    options: { redirectTo },
  });
};

function buildRedirectUrl(next?: string): string {
  const base = getBaseUrlClient();
  const url = `${base}/auth/callback`;

  const params = new URLSearchParams();
  if (next) {
    params.append("next", next);
  }

  return `${url}${params.toString() ? `?${params.toString()}` : ""}`;
}

function getBaseUrlClient() {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  return "";
}
