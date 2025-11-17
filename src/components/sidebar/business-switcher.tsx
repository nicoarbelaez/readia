"use client";

import * as React from "react";
import { ChevronsUpDown, GalleryVerticalEnd, RefreshCw } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useBusinessSwitcher } from "./hooks/use-business-switcher";
import { SidebarMenuCompany } from "@/components/forms/company-profile/organisms/sidebar-menu-company";
import { Skeleton } from "@/components/ui/skeleton";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { useEffect } from "react";

export function BusinessSwitcher() {
  const { isMobile } = useSidebar();
  const {
    businesses,
    activeBusiness,
    setActiveBusiness,
    isLoading,
    refreshBusinesses,
  } = useBusinessSwitcher();

  // Manejar atajos de teclado para cambiar de negocio
  useEffect(() => {
    if (businesses.length === 0) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      // No hacer nada si el usuario está escribiendo en un input o textarea
      const target = event.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.tagName === "SELECT" ||
        target.isContentEditable
      ) {
        return;
      }

      if (event.altKey && event.key >= "1" && event.key <= businesses.length.toString()) {
        const index = parseInt(event.key) - 1;

        if (index >= 0 && index < businesses.length) {
          event.preventDefault();
          setActiveBusiness(businesses[index]);
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [businesses, setActiveBusiness]);

  // Muestra un esqueleto de carga mientras se obtienen las empresas
  if (isLoading && businesses.length === 0) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" disabled>
            <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
              <GalleryVerticalEnd className="size-4" />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="mt-1 h-3 w-full" />
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }

  // No muestra nada si no hay empresas disponibles
  if (!activeBusiness && businesses.length === 0) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" className="cursor-pointer">
            <SidebarMenuCompany />
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }

  // Muestra el selector de empresas cuando hay empresas disponibles
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer"
            >
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <GalleryVerticalEnd className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {activeBusiness?.companyName || "Seleccionar empresa"}
                </span>
                <span className="truncate text-xs">
                  {activeBusiness?.description ||
                    `${businesses.length} empresas`}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-muted-foreground flex items-center justify-between text-xs">
              Empresas
              <button
                onClick={refreshBusinesses}
                disabled={isLoading}
                className="hover:bg-accent cursor-pointer rounded p-1"
                title="Refrescar lista"
              >
                <RefreshCw
                  className={`size-3 ${isLoading ? "animate-spin" : ""}`}
                />
              </button>
            </DropdownMenuLabel>

            {businesses.map((business, index) => (
              <DropdownMenuItem
                key={business.id}
                onClick={() => setActiveBusiness(business)}
                className={`gap-2 p-2 ${
                  activeBusiness?.id === business.id ? "bg-accent" : ""
                }`}
              >
                <div className="flex size-6 items-center justify-center rounded-md border">
                  <GalleryVerticalEnd className="size-3.5 shrink-0" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate font-medium">
                    {business.companyName}
                  </div>
                  {business.description && (
                    <div className="text-muted-foreground truncate text-xs">
                      {business.description}
                    </div>
                  )}
                </div>
                <DropdownMenuShortcut>
                  <KbdGroup>
                    <Kbd>Alt</Kbd>
                    <span>+</span>
                    <Kbd>{index + 1}</Kbd>
                  </KbdGroup>
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}

            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
