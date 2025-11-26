"use client";

import { Building2, House, LandPlot } from "lucide-react";
import { IconSitemap } from "@tabler/icons-react";

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
import { NavButtonItem } from "@/components/sidebar/nav-button-item";

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
  const NO_AVAILABLE_BUSINESSES_MESSAGE = "No tienes empresas disponibles";

  const { businesses } = useBusinessSwitcher();
  const hasBusinesses = businesses.length <= 0;

  const data: SidebarData = {
    user,
    navMain: [
      {
        title: "Inicio",
        url: "/home",
        icon: House,
      },
      {
        title: "Diagnóstico",
        url: "/diagnostic",
        icon: LandPlot,
        disabled: hasBusinesses,
        disabledMessage: NO_AVAILABLE_BUSINESSES_MESSAGE,
      },
      {
        title: "Hoja de ruta",
        url: "/roadmap",
        icon: IconSitemap,
        disabled: hasBusinesses,
        disabledMessage: NO_AVAILABLE_BUSINESSES_MESSAGE,
      },
    ],
    config: [
      {
        title: "Mi empresa",
        url: "/business",
        icon: Building2,
        disabled: hasBusinesses,
        disabledMessage: NO_AVAILABLE_BUSINESSES_MESSAGE,
      },
    ],
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <BusinessSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavButtonItem items={data.navMain} />
        <NavButtonItem items={data.config} title="Configuración" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
