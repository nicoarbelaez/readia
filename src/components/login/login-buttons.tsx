"use client";

import { useState, useEffect } from "react";
import { SocialAuthButton } from "@/components/login/social-auth-button";
import { type SignInFunction } from "@/lib/sign-in";

export function LoginButtons() {
  const [isLoading, setIsLoading] = useState(false);
  const [nextUrl, setNextUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const nextParam = params.get("next") ?? undefined;
    setNextUrl(nextParam);
  }, []);

  const startSignIn = async (signIn: SignInFunction) => {
    setIsLoading(true);

    try {
      await signIn(nextUrl);
    } catch {
      setIsLoading(false);
    }
  };

  return (
    <>
      <SocialAuthButton
        isLoading={isLoading}
        provider="google"
        variant="secondary"
        startSignIn={startSignIn}
      />
      <SocialAuthButton
        isLoading={isLoading}
        provider="github"
        variant="outline"
        startSignIn={startSignIn}
      />
    </>
  );
}
