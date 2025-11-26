import React from "react";
import { TooltipProvider } from "@/components/ui/tooltip";

interface PageLayoutProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
}

export const PageLayout: React.FC<PageLayoutProps> = ({
  title,
  description,
  actions,
  children,
}) => {
  return (
    <TooltipProvider>
      <div className="flex flex-col space-y-6">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight md:text-3xl">
              {title}
            </h1>
            {description && (
              <p className="mt-1 text-sm md:text-base">{description}</p>
            )}
          </div>
          {actions && (
            <div className="flex space-x-2 md:space-x-3">{actions}</div>
          )}
        </div>

        {/* Contenido de la página */}
        <div className="flex-1">{children}</div>
      </div>
    </TooltipProvider>
  );
};
