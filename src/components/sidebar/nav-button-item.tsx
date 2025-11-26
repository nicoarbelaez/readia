import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  SidebarMenuButtonItem,
  SidebarMenuSubButtonItem,
} from "@/components/sidebar/nav-items";
import { NavItem } from "@/types/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type NavButtonItemProps = { title?: string; items: NavItem[] };

export function NavButtonItem({ title, items }: NavButtonItemProps) {
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      {title && <SidebarGroupLabel>{title}</SidebarGroupLabel>}
      <SidebarMenu>
        {items.map(
          ({
            title,
            isActive,
            url,
            icon: Icon,
            items: subItems,
            disabled,
            disabledMessage = "Elemento deshabilitado",
          }) => {
            const hasItems = !!subItems?.length;

            const buttonContent = (
              <span className="relative">
                <SidebarMenuButtonItem
                  hasItems={hasItems}
                  title={title}
                  url={url}
                  icon={Icon}
                  disabled={disabled}
                />

                {disabled && (
                  <div className="pointer-events-auto absolute inset-0 z-10 bg-transparent" />
                )}
              </span>
            );

            const collapsibleContent = (
              <Collapsible
                key={title}
                asChild
                defaultOpen={isActive}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    {buttonContent}
                  </CollapsibleTrigger>

                  {hasItems && !disabled && (
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

            // Renderizado condicional con Tooltip
            return disabled ? (
              <Tooltip key={title}>
                <TooltipTrigger asChild>{collapsibleContent}</TooltipTrigger>
                <TooltipContent>
                  <p>{disabledMessage}</p>
                </TooltipContent>
              </Tooltip>
            ) : (
              collapsibleContent
            );
          },
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
}
