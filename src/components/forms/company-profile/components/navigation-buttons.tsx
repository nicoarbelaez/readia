"use client";

import { Button } from "@/components/ui/button";

interface NavigationButtonsProps {
  onBack?: () => void;
  onNext?: () => void;
  isNextDisabled?: boolean;
  isBackDisabled?: boolean;
  nextLabel?: string;
  backLabel?: string;
  className?: string;
}

export function NavigationButtons({
  onBack,
  onNext,
  isNextDisabled = false,
  isBackDisabled = false,
  nextLabel = "Siguiente",
  backLabel = "Atrás",
  className = "flex justify-between mt-4",
}: NavigationButtonsProps) {
  return (
    <div className={className}>
      {onBack && (
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          disabled={isBackDisabled}
        >
          {backLabel}
        </Button>
      )}
      {onNext && (
        <Button onClick={onNext} disabled={isNextDisabled}>
          {nextLabel}
        </Button>
      )}
    </div>
  );
}
