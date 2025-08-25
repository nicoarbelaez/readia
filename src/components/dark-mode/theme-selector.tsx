"use client";

import { Monitor, Moon, Sun } from "lucide-react";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";

export function ThemeSelector() {
  const { setTheme } = useTheme();

  return (
    <>
      <DropdownMenuItem onClick={() => setTheme("light")}>
        <Sun />
        Claro
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => setTheme("dark")}>
        <Moon />
        Oscuro
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => setTheme("system")}>
        <Monitor />
        Sistema
      </DropdownMenuItem>
    </>
  );
}
