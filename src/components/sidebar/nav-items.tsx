"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ChevronRight, LucideIcon } from "lucide-react";
import { TablerIcon } from "@tabler/icons-react";
import {
  SidebarMenuButton,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import React from "react";

// Props base para todos los elementos de navegación
type NavItemBase = {
  title: string;
  url: string;
};

// Props para el botón principal del menú
type SidebarMenuButtonItemProps = React.ComponentProps<
  typeof SidebarMenuButton
> &
  NavItemBase & {
    icon?: LucideIcon | TablerIcon;
    hasItems?: boolean;
  };

// Props para el sub-botón del menú
type SidebarMenuSubButtonItemProps = React.ComponentProps<
  typeof SidebarMenuSubButton
> &
  NavItemBase;

const ConditionalWrapper: React.FC<{
  condition: boolean;
  wrapper: (children: React.ReactNode) => React.ReactElement;
  children: React.ReactNode;
}> = ({ condition, wrapper, children }) =>
  condition ? wrapper(children) : <>{children}</>;

export function SidebarMenuButtonItem({
  title,
  url,
  icon: Icon,
  hasItems = false,
  className,
  ...props
}: SidebarMenuButtonItemProps) {
  const pathname = usePathname();
  const isActive = pathname === url;

  const content = (
    <SidebarMenuButton
      isActive={isActive}
      tooltip={title}
      className={cn("flex cursor-pointer items-center", className)}
      {...props}
    >
      {Icon && <Icon />}
      <span>{title}</span>
      {hasItems && (
        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
      )}
    </SidebarMenuButton>
  );

  return (
    <ConditionalWrapper
      condition={!hasItems}
      wrapper={(children) => <Link href={url}>{children}</Link>}
    >
      {content}
    </ConditionalWrapper>
  );
}

export function SidebarMenuSubButtonItem({
  title,
  url,
  className,
  ...props
}: SidebarMenuSubButtonItemProps) {
  const pathname = usePathname();
  const isActive = pathname === url;

  return (
    <SidebarMenuSubButton
      asChild
      isActive={isActive}
      className={cn("cursor-pointer", className)}
      {...props}
    >
      <Link href={url}>
        <span>{title}</span>
      </Link>
    </SidebarMenuSubButton>
  );
}
