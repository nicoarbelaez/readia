"use client";

import * as React from "react";
import { Frame, House, SquareTerminal } from "lucide-react";

import { NavMain } from "@/components/sidebar/nav-main";
import { NavProjects } from "@/components/sidebar/nav-projects";
import { NavUser, type NavUserProps } from "@/components/sidebar/nav-user";
import {
  BusinessSwitcher,
  BusinessSwitcherProps,
} from "@/components/sidebar/business-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { IconSitemap } from "@tabler/icons-react";

type SidebarProps = React.ComponentProps<typeof Sidebar> & {
  user: NavUserProps["user"] & {
    businesses: BusinessSwitcherProps["businessses"];
  };
};

export function AppSidebar({
  user: { email, fullName, userName, avatarUrl, businesses },
  ...props
}: SidebarProps) {
  const data = {
    user: {
      email,
      fullName,
      userName,
      avatarUrl,
    },
    businessses: businesses,
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
        isActive: true,
        items: [
          {
            title: "History",
            url: "#",
          },
          {
            title: "Starred",
            url: "#",
          },
          {
            title: "Settings",
            url: "#",
          },
        ],
      },
    ],
    projects: [
      {
        name: "Design Engineering",
        url: "#",
        icon: Frame,
      },
    ],
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <BusinessSwitcher businessses={data.businessses} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
