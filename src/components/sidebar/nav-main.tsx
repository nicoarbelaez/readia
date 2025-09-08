"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";
import { type TablerIcon } from "@tabler/icons-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon | TablerIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map(({ title, isActive, url, icon: Icon, items: subItems }) => {
          const hasItems = !!subItems?.length;

          const buttonContent = (
            <SidebarMenuButton tooltip={title} className="cursor-pointer">
              {Icon && <Icon />}
              <span>{title}</span>
              {hasItems && (
                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
              )}
            </SidebarMenuButton>
          );

          return (
            <Collapsible
              key={title}
              asChild
              defaultOpen={isActive}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  {!hasItems ? (
                    <Link href={url}>{buttonContent}</Link>
                  ) : (
                    buttonContent
                  )}
                </CollapsibleTrigger>

                {hasItems && (
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {subItems!.map((sub) => (
                        <SidebarMenuSubItem key={sub.title}>
                          <SidebarMenuSubButton asChild>
                            <Link href={sub.url}>
                              <span>{sub.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                )}
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
