"use client";

import * as React from "react";
import { Frame, GalleryVerticalEnd, House, SquareTerminal } from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { IconSitemap } from "@tabler/icons-react";

interface SidebarProps extends React.ComponentProps<typeof Sidebar> {
  user: {
    email: string;
    name: string;
    avatar: string;
  };
}

export function AppSidebar({
  user: { email, name, avatar },
  ...props
}: SidebarProps) {
  const data = {
    user: {
      name,
      email,
      avatar,
    },
    teams: [
      {
        name: "Acme Inc",
        logo: GalleryVerticalEnd,
        plan: "Enterprise",
      },
    ],
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
        <TeamSwitcher teams={data.teams} />
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
