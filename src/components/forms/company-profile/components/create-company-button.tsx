"use client";

import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface CreateCompanyButtonProps
  extends React.ButtonHTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function CreateCompanyButton({
  className,
  ...props
}: CreateCompanyButtonProps) {
  return (
    <div
      {...props}
      className={cn(
        "hover:bg-accent flex cursor-pointer items-center gap-2",
        className,
      )}
    >
      <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
        <Plus className="size-4" />
      </div>
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-medium">Crear empresa</span>
        <span className="truncate text-xs">
          Crea para empezar el diagnósticoo
        </span>
      </div>
    </div>
  );
}
