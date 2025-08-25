import { createClient } from "@/utils/supabase/client";

type SignInResult = { provider: SignInProviders };

export type SignInProviders = "google" | "github";
export type SignInFunction = (next?: string) => Promise<SignInResult>;

// Cliente supabase
const supabase = createClient();

// Login con Google
export const signInWithGoogle: SignInFunction = async (next?: string) => {
  return await signIn("google", next);
};

// Login con GitHub
export const signInWithGitHub: SignInFunction = async (next?: string) => {
  return await signIn("github", next);
};

const signIn = async (
  provider: SignInProviders,
  next?: string,
) => {
  const redirectTo = buildRedirectUrl(next);
  await supabase.auth.signInWithOAuth({
    provider: provider,
    options: { redirectTo },
  });
  return { provider };
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
