"use client";

import { BadgeCheck, LogOut } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { IconDotsVertical } from "@tabler/icons-react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { usePathname, useRouter } from "next/navigation";
import { ThemeSelector } from "@/components/dark-mode/theme-selector";
import { Skeleton } from "@/components/ui/skeleton";

export interface NavUserProps {
  user: {
    email: string;
    full_name: string;
    user_name: string;
    avatar_url: string;
  };
}

export function NavUser({
  user: { email, full_name, user_name, avatar_url },
}: NavUserProps) {
  const { isMobile } = useSidebar();

  const router = useRouter();
  const pathname = usePathname();

  const supabase = createClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    const href = `/login?next=${encodeURIComponent(pathname)}`;
    router.push(href);
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={avatar_url} alt={full_name} />
                <AvatarFallback className="rounded-lg" />
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                {full_name !== "" ? (
                  <span className="truncate font-medium">{full_name}</span>
                ) : (
                  <Skeleton className="h-4 w-full" />
                )}

                {user_name !== "" ? (
                  <span className="truncate text-xs">@{user_name}</span>
                ) : (
                  <Skeleton className="mt-1 h-3 w-2/3" />
                )}
              </div>
              <IconDotsVertical className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={avatar_url} alt={full_name} />
                  <AvatarFallback className="rounded-lg" />
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{full_name}</span>
                  <span className="truncate text-xs">{email}</span>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
            <DropdownMenuGroup>
              <Link href="/account">
                <DropdownMenuItem>
                  <BadgeCheck /> Cuenta
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuLabel>Tema</DropdownMenuLabel>
            <DropdownMenuGroup>
              <ThemeSelector />
            </DropdownMenuGroup>

            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleSignOut}
              className="text-destructive"
              data-variant="destructive"
            >
              <LogOut />
              Cerrar sesión
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
