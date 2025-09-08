import { type LucideIcon } from "lucide-react";
import { type TablerIcon } from "@tabler/icons-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  SidebarMenuButtonItem,
  SidebarMenuSubButtonItem,
} from "@/components/sidebar/nav-items";

interface NavMainProps {
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
}

export function NavMain({ items }: NavMainProps) {
  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map(({ title, isActive, url, icon: Icon, items: subItems }) => {
          const hasItems = !!subItems?.length;

          const buttonContent = (
            <SidebarMenuButtonItem
              hasItems={hasItems}
              title={title}
              url={url}
              icon={Icon}
            />
          );

          return (
            <Collapsible
              key={title}
              asChild
              defaultOpen={isActive}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>{buttonContent}</CollapsibleTrigger>

                {hasItems && (
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {subItems!.map((sub) => (
                        <SidebarMenuSubItem key={sub.title}>
                          <SidebarMenuSubButtonItem
                            title={sub.title}
                            url={sub.url}
                          />
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
