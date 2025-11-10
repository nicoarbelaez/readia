"use client";

import { Button } from "@/components/ui/button";

interface StepNavigationProps {
  onNext?: () => void;
  onBack?: () => void;
  isNextDisabled?: boolean;
  isBackDisabled?: boolean;
  nextLabel?: string;
  backLabel?: string;
  showNext?: boolean;
  showBack?: boolean;
}

export function StepNavigation({
  onNext,
  onBack,
  isNextDisabled = false,
  isBackDisabled = false,
  nextLabel = "Siguiente",
  backLabel = "Atrás",
  showNext = true,
  showBack = true,
}: StepNavigationProps) {
  return (
    <div className="flex justify-between">
      {showBack && (
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          disabled={isBackDisabled}
        >
          {backLabel}
        </Button>
      )}
      {showNext && (
        <Button type="submit" disabled={isNextDisabled} className="ml-auto">
          {nextLabel}
        </Button>
      )}
    </div>
  );
}
