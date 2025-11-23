"use client";

import { Building2, House, SquareTerminal } from "lucide-react";
import { IconSitemap } from "@tabler/icons-react";

import { NavMain } from "@/components/sidebar/nav-main";
import { NavConfiguration } from "@/components/sidebar/nav-configuration";
import { NavUser, NavUserProps } from "@/components/sidebar/nav-user";
import { BusinessSwitcher } from "@/components/sidebar/business-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

import { SidebarData } from "@/types/sidebar";
import {
  BusinessProvider,
  useBusinessSwitcher,
} from "@/context/business-context";

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  user: NavUserProps["user"];
};

export function AppSidebar(props: AppSidebarProps) {
  return (
    <BusinessProvider>
      <AppSidebarContent {...props} />
    </BusinessProvider>
  );
}

function AppSidebarContent({ user, ...props }: AppSidebarProps) {
  const { businesses } = useBusinessSwitcher();

  const data: SidebarData = {
    user,
    navMain: [
      {
        title: "Inicio",
        url: "/home",
        icon: House,
        isActive: true,
      },
      {
        title: "Hoja de ruta",
        url: "/roadmap",
        icon: IconSitemap,
        isActive: true,
      },
      {
        title: "Playground",
        url: "#",
        icon: SquareTerminal,
        items: [
          { title: "History", url: "#" },
          { title: "Starred", url: "#" },
          { title: "Settings", url: "#" },
        ],
      },
    ],
    config: [
      {
        title: "Mi empresa",
        url: "/business",
        icon: Building2,
        disabled: businesses.length <= 0,
        disabledMessage: "No tienes empresas disponibles",
      },
    ],
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <BusinessSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavConfiguration items={data.config} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
