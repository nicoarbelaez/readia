import type { NavUserProps } from "@/components/sidebar/nav-user";
import type { LucideIcon } from "lucide-react";
import type { TablerIcon } from "@tabler/icons-react";

export type IconComponent = LucideIcon | TablerIcon;

export interface NavItem {
  title: string;
  url: string;
  icon?: IconComponent;
  isActive?: boolean;
  disabled?: boolean;
  items?: Array<{
    title: string;
    url: string;
  }>;
}

export interface SidebarData {
  user: NavUserProps["user"];
  navMain: NavItem[];
  config: NavItem[];
}
