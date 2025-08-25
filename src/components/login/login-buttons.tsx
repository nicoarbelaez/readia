"use client";

import { useState, useEffect } from "react";
import { SocialAuthButton } from "@/components/login/social-auth-button";
import { SignInProviders, type SignInFunction } from "@/lib/sign-in";

export function LoginButtons() {
  const [provider, setProvider] = useState<SignInProviders | null>(null);
  const [nextUrl, setNextUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const nextParam = params.get("next") ?? undefined;
    setNextUrl(nextParam);
  }, []);

  const startSignIn = async (signIn: SignInFunction) => {
    try {
      const { provider } = await signIn(nextUrl);
      setProvider(provider);
    } catch {
      setProvider(null);
    }
  };

  return (
    <>
      <SocialAuthButton
        loginProvider={provider}
        provider="google"
        variant="secondary"
        startSignIn={startSignIn}
      />
      <SocialAuthButton
        loginProvider={provider}
        provider="github"
        variant="outline"
        startSignIn={startSignIn}
      />
    </>
  );
}
